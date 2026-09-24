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

  async create(createResenaDto: CreateResenaDto) {
    const { platoId, ...resenaData } = createResenaDto;
    const plato = await this.platoRepository.findOneBy({ id: platoId });
    if (!plato) {
      throw new NotFoundException('Plato no encontrado');
    }

    const resena = this.resenaRepository.create({
      ...resenaData,
      plato,
    });
    return this.resenaRepository.save(resena);
  }

  findAll() {
    return this.resenaRepository.find();
  }

  findByPlato(platoId: number) {
    return this.resenaRepository.find({
      where: { plato: { id: platoId } },
      order: { createdAt: 'DESC' },
    });
  }
}