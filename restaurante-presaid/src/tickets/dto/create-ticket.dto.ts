import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CreateTicketDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  mesaId: number;
}