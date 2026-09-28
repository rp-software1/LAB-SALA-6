import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { Pedido } from './entities/pedido.entity';
import { PedidoPlato } from './entities/pedido-plato.entity';
import { Plato } from '../platos/entities/plato.entity';
import { MesasModule } from '../mesas/mesas.module'; // ← Importar MesasModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoPlato, Plato]),
    MesasModule, // ← Permite usar MesasService dentro de PedidosService
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}