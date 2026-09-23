import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from '../platos/entities/plato.entity';
import { CreateResenaDto } from './dto/create-resena.dto';
import { Resena } from './entities/resena.entity';

@Injectable()
export class ResenasService {
  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepository: Repository<Resena>,
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  async create(platoId: number, createResenaDto: CreateResenaDto) {
    const plato = await this.platoRepository.findOneBy({ id: platoId });
    if (!plato) {
      throw new NotFoundException(`Plato #${platoId} no encontrado`);
    }

    const resena = this.resenaRepository.create({
      ...createResenaDto,
      plato,
    });
    return this.resenaRepository.save(resena);
  }

  findByPlato(platoId: number) {
    return this.resenaRepository.find({
      where: { plato: { id: platoId } },
      order: { fecha: 'DESC' },
    });
  }
}