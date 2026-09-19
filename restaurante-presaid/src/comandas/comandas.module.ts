import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { ComandasController } from './comandas.controller';
import { ComandasService } from './comandas.service';
import { Comanda } from './entities/comanda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comanda, Pedido])],
  controllers: [ComandasController],
  providers: [ComandasService],
  exports: [ComandasService, TypeOrmModule],
})
export class ComandasModule {}