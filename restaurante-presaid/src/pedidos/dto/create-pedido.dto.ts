import { IsInt, IsPositive, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoDto {
  @ApiProperty({ example: 1, description: 'ID de la mesa asociada al pedido' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  mesaId: number;

  @ApiProperty({ example: [1, 2], description: 'Arreglo de IDs de los platos solicitados' })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  platoIds: number[];
}