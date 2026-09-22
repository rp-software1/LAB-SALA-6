import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatosModule } from './platos/platos.module';
import { MesasModule } from './mesas/mesas.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ComandasModule } from './comandas/comandas.module';
import { TicketsModule } from './tickets/tickets.module';

const isProduction = !!process.env.DATABASE_URL;

@Module({
  imports: [
    TypeOrmModule.forRoot(
      isProduction
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            ssl: { rejectUnauthorized: false },
          }
        : {
            type: 'better-sqlite3',
            database: 'db.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
          },
    ),
    PlatosModule,
    MesasModule,
    PedidosModule,
    ComandasModule,
    TicketsModule,
  ],
})
export class AppModule {}