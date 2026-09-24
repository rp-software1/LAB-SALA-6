import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateResenaDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  platoId: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsString()
  @IsNotEmpty()
  nombreCliente: string;
}