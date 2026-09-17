import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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
    const { mesaId, platoIds } = createPedidoDto;

    // 1. Validar que la mesa exista (Lanza error 400 si no existe)
    const mesa = await this.mesaRepository.findOne({ where: { id: mesaId } });
    if (!mesa) {
      throw new BadRequestException(`La mesa con ID ${mesaId} no existe.`);
    }

    // 2. Validar que todos los platos existan (Lanza error 400 si falta alguno)
    const platos = await this.platoRepository.findBy({ id: In(platoIds) });
    if (platos.length !== platoIds.length) {
      throw new BadRequestException('Uno o más IDs de platos proporcionados no existen.');
    }

    // 3. Calcular el total sumando los precios de los platos
    const total = platos.reduce((sum, plato) => sum + Number(plato.precio), 0);

    // 4. Crear y guardar el pedido con relaciones reales
    const nuevoPedido = this.pedidoRepository.create({
      mesaId,
      mesa,
      platos,
      total,
      estado: EstadoPedido.PENDIENTE,
    });

    return await this.pedidoRepository.save(nuevoPedido);
  }

  async findAll(): Promise<Pedido[]> {
    return await this.pedidoRepository.find({
      relations: {
        mesa: true,
        platos: true,
      },
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: {
        mesa: true,
        platos: true,
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