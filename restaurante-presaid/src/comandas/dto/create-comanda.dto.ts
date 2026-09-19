import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateComandaDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  pedidoId: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}