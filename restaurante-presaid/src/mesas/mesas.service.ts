import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { EstadoMesa, Mesa } from './mesa.entity';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesasRepository: Repository<Mesa>,
  ) {}

  create(createMesaDto: CreateMesaDto) {
    const mesa = this.mesasRepository.create(createMesaDto);
    return this.mesasRepository.save(mesa).catch((error: { code?: string }) => {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException(
          `El número de mesa ${createMesaDto.numero} ya existe`,
        );
      }
      throw error;
    });
  }

  findAll() {
    return this.mesasRepository.find({ order: { numero: 'ASC' } });
  }

  async findOne(id: number) {
    const mesa = await this.mesasRepository.findOneBy({ id });
    if (!mesa) {
      throw new NotFoundException(`Mesa #${id} no encontrada`);
    }
    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) {
    const mesa = await this.mesasRepository.preload({
      id,
      ...updateMesaDto,
    });
    if (!mesa) {
      throw new NotFoundException(`Mesa #${id} no encontrada`);
    }

    try {
      return await this.mesasRepository.save(mesa);
    } catch (error) {
      if ((error as { code?: string }).code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException(
          `El número de mesa ${updateMesaDto.numero} ya existe`,
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    const mesa = await this.findOne(id);
    await this.mesasRepository.remove(mesa);
    return { mensaje: `Mesa #${id} eliminada` };
  }

  async cambiarEstado(id: number, estado: EstadoMesa) {
    const mesa = await this.findOne(id);
    mesa.estado = estado;
    return this.mesasRepository.save(mesa);
  }
}
