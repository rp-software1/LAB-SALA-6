import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { MesasModule } from '../mesas/mesas.module'; // ← Importar MesasModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    MesasModule, // ← Permite usar MesasService dentro de TicketsService
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}