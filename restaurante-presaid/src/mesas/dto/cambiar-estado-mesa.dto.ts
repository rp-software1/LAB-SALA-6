import { IsEnum } from 'class-validator';
import { EstadoMesa } from '../mesa.entity';

export class CambiarEstadoMesaDto {
  @IsEnum(EstadoMesa)
  estado: EstadoMesa;
}
