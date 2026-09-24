import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido, EstadoPedido } from './entities/pedido.entity';
import { Mesa } from '../mesas/mesa.entity';
import { Plato } from '../platos/entities/plato.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const { mesaId, items } = createPedidoDto;

    // 1. Validar que la mesa exista (Lanza error 400 si no existe)
    const mesa = await this.mesaRepository.findOne({ where: { id: mesaId } });
    if (!mesa) {
      throw new BadRequestException(`La mesa con ID ${mesaId} no existe.`);
    }

    // 2. Resolver cada plato y calcular su subtotal según la cantidad solicitada.
    const pedidoItems = await Promise.all(
      items.map(async (item) => {
        const plato = await this.platoRepository.findOneBy({ id: item.platoId });
        if (!plato) {
          throw new NotFoundException(`Plato #${item.platoId} no encontrado`);
        }

        return {
          plato,
          cantidad: item.cantidad,
        };
      }),
    );
    const total = pedidoItems.reduce(
      (sum, item) => sum + Number(item.plato.precio) * item.cantidad,
      0,
    );

    // 3. Crear y guardar el pedido con sus ítems asociados.
    const nuevoPedido = this.pedidoRepository.create({
      mesaId,
      mesa,
      items: pedidoItems,
      total,
      estado: EstadoPedido.PENDIENTE,
    });

    return await this.pedidoRepository.save(nuevoPedido);
  }

  async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      relations: {
        mesa: true,
        items: { plato: true },
      },
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: {
        mesa: true,
        items: { plato: true },
      },
    });
    if (!pedido) {
      throw new NotFoundException(`El pedido con ID ${id} no fue encontrado.`);
    }
    return pedido;
  }

  async cambiarEstado(id: number, nuevoEstado: EstadoPedido): Promise<Pedido> {
    const pedido = await this.findOne(id);
    pedido.estado = nuevoEstado;
    return await this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}