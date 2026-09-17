import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { Plato } from '../platos/entities/plato.entity';
import { Mesa } from '../mesas/mesa.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Plato)
    private platoRepository: Repository<Plato>,
    @InjectRepository(Mesa)
    private mesaRepository: Repository<Mesa>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const { cantidad, mesaId, platoId } = createPedidoDto;

    // Validar que la mesa exista
    const mesa = await this.mesaRepository.findOneBy({ id: mesaId });
    if (!mesa) {
      throw new NotFoundException(`La mesa con ID ${mesaId} no existe`);
    }

    // Validar que el plato exista
    const plato = await this.platoRepository.findOneBy({ id: platoId });
    if (!plato) {
      throw new NotFoundException(`El plato con ID ${platoId} no existe`);
    }

    // Crear y guardar el pedido con relaciones reales
    const pedido = this.pedidoRepository.create({
      cantidad,
      mesa,
      plato,
    });

    return await this.pedidoRepository.save(pedido);
  }

  async findAll() {
    return await this.pedidoRepository.find();
  }
}