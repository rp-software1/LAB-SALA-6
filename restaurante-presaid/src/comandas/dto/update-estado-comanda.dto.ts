import { IsEnum } from 'class-validator';
import { EstadoComanda } from '../entities/comanda.entity';

export class UpdateEstadoComandaDto {
  @IsEnum(EstadoComanda)
  estado: EstadoComanda;
}