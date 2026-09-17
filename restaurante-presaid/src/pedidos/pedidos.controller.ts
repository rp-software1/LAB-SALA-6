import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { EstadoPedido } from './entities/pedido.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido con múltiples platos y cálculo de total' })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Mesa o platos inválidos / no encontrados.' })
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos con sus relaciones de mesa y platos' })
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido específico por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar el estado de un pedido' })
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado') estado: EstadoPedido,
  ) {
    return this.pedidosService.cambiarEstado(id, estado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pedido' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.remove(id);
  }
}