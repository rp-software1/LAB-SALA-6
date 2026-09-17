import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { Pedido } from './entities/pedido.entity';
import { Plato } from '../platos/entities/plato.entity';
import { Mesa } from '../mesas/mesa.entity'; // Ajusta esta ruta si tu mesa está en otra carpeta

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Plato, Mesa])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}