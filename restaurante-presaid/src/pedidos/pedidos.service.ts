import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { MesasService } from '../mesas/mesas.service';
import { EstadoMesa } from '../mesas/mesa.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
    private readonly mesasService: MesasService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    // 1. Consultar la mesa para validar su estado actual
    const mesa = await this.mesasService.findOne(createPedidoDto.mesaId);

    // 2. Si la mesa está reservada, lanzar error 400
    if (mesa.estado === EstadoMesa.RESERVADA) {
      throw new BadRequestException(
        `La mesa #${createPedidoDto.mesaId} está reservada. No se pueden crear pedidos.`,
      );
    }

    // 3. Mapear explícitamente los items con su relación a plato
    const items = createPedidoDto.items.map((item) => ({
      cantidad: item.cantidad,
      platoId: item.platoId,
      plato: { id: item.platoId },
    }));

    // 4. Crear la entidad Pedido asignando mesa e items mapeados
    const pedido = this.pedidosRepository.create({
      mesaId: createPedidoDto.mesaId,
      mesa: { id: createPedidoDto.mesaId },
      items,
    });

    const pedidoGuardado = await this.pedidosRepository.save(pedido);

    // 5. Ocupar la mesa automáticamente
    await this.mesasService.cambiarEstado(
      createPedidoDto.mesaId,
      EstadoMesa.OCUPADA,
    );

    return pedidoGuardado;
  }

  async findAll() {
    return await this.pedidosRepository.find({
      relations: {
        items: {
          plato: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const pedido = await this.pedidosRepository.findOne({
      where: { id },
      relations: {
        items: {
          plato: true,
        },
      },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido #${id} no encontrado`);
    }
    return pedido;
  }

  async cambiarEstado(id: number, estado: any) {
    const pedido = await this.findOne(id);
    pedido.estado = estado;
    return await this.pedidosRepository.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    await this.pedidosRepository.remove(pedido);
    return { mensaje: `Pedido #${id} eliminado` };
  }
}