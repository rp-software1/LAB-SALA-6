import { IsEnum } from 'class-validator';
import { MetodoPago } from '../entities/ticket.entity';

export class PagarTicketDto {
  @IsEnum(MetodoPago)
  metodoPago: MetodoPago;
}