import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoDto {
  @ApiProperty({ example: 2, description: 'Cantidad de platos solicitados' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  cantidad: number;

  @ApiProperty({ example: 1, description: 'ID de la mesa asociada al pedido' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  mesaId: number;

  @ApiProperty({ example: 1, description: 'ID del plato solicitado' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  platoId: number;
}