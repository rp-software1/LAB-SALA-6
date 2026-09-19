import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateEstadoComandaDto } from './dto/update-estado-comanda.dto';
import { Comanda } from './entities/comanda.entity';

@Injectable()
export class ComandasService {
  constructor(
    @InjectRepository(Comanda)
    private readonly comandaRepository: Repository<Comanda>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createComandaDto: CreateComandaDto): Promise<Comanda> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: createComandaDto.pedidoId },
      relations: { platos: true },
    });

    if (!pedido) {
      throw new NotFoundException(
        `El pedido con ID ${createComandaDto.pedidoId} no fue encontrado.`,
      );
    }

    const comanda = this.comandaRepository.create({
      pedidoId: pedido.id,
      pedido,
      observaciones: createComandaDto.observaciones ?? null,
    });

    return this.comandaRepository.save(comanda);
  }

  findAll(): Promise<Comanda[]> {
    return this.comandaRepository.find({
      relations: { pedido: { platos: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async updateEstado(
    id: number,
    updateEstadoComandaDto: UpdateEstadoComandaDto,
  ): Promise<Comanda> {
    const comanda = await this.comandaRepository.findOne({
      where: { id },
      relations: { pedido: { platos: true } },
    });

    if (!comanda) {
      throw new NotFoundException(`La comanda con ID ${id} no fue encontrada.`);
    }

    comanda.estado = updateEstadoComandaDto.estado;
    return this.comandaRepository.save(comanda);
  }
}