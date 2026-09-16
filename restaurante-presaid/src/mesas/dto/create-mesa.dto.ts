import { IsInt, Min } from 'class-validator';

export class CreateMesaDto {
  @IsInt()
  @Min(1)
  numero: number;

  @IsInt()
  @Min(1)
  capacidad: number;
}
