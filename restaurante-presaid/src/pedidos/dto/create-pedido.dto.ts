import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePedidoItemDto {
  @ApiProperty({ example: 1, description: 'ID del plato solicitado' })
  @IsNumber()
  @IsNotEmpty()
  platoId: number;

  @ApiProperty({ example: 2, description: 'Cantidad solicitada del plato' })
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cantidad: number;
}

export class CreatePedidoDto {
  @ApiProperty({ example: 1, description: 'ID de la mesa asociada al pedido' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  mesaId: number;

  @ApiProperty({ type: [CreatePedidoItemDto], description: 'Platos y cantidades solicitadas' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoItemDto)
  items: CreatePedidoItemDto[];
}