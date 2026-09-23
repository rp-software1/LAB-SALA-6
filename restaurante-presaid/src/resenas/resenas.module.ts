import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plato } from '../platos/entities/plato.entity';
import { Resena } from './entities/resena.entity';
import { ResenasController } from './resenas.controller';
import { ResenasService } from './resenas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resena, Plato])],
  controllers: [ResenasController],
  providers: [ResenasService],
})
export class ResenasModule {}