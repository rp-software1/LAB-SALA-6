import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateResenaDto {
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsString()
  @IsNotEmpty()
  comentario: string;
}