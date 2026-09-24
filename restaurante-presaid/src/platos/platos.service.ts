import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from './entities/plato.entity';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';

@Injectable()
export class PlatosService {
  constructor(
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  create(createPlatoDto: CreatePlatoDto) {
    const plato = this.platoRepository.create(createPlatoDto);
    return this.platoRepository.save(plato);
  }

  findAll() {
    return this.platoRepository.find();
  }

  async findOne(id: number) {
    const plato = await this.platoRepository.findOne({
      where: { id },
      relations: { resenas: true },
    });
    if (!plato) {
      throw new NotFoundException(`Plato #${id} no encontrado`);
    }
    return plato;
  }

  async update(id: number, updatePlatoDto: UpdatePlatoDto) {
    const plato = await this.platoRepository.preload({
      id,
      ...updatePlatoDto,
    });
    if (!plato) {
      throw new NotFoundException(`Plato #${id} no encontrado`);
    }
    return this.platoRepository.save(plato);
  }

  async remove(id: number) {
    const plato = await this.findOne(id);
    await this.platoRepository.remove(plato);
    return { mensaje: `Plato #${id} eliminado` };
  }
}
