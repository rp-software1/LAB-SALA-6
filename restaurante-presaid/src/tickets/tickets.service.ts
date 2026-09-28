import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, EstadoTicket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PagarTicketDto } from './dto/pagar-ticket.dto';
import { MesasService } from '../mesas/mesas.service';
import { EstadoMesa } from '../mesas/mesa.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
    private readonly mesasService: MesasService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const ticket = this.ticketsRepository.create(createTicketDto);
    return await this.ticketsRepository.save(ticket);
  }

  async findOne(id: number) {
    const ticket = await this.ticketsRepository.findOne({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket #${id} no encontrado`);
    }
    return ticket;
  }

  async pagar(id: number, pagarTicketDto: PagarTicketDto) {
    const ticket = await this.findOne(id);

    // 1. Marcar el ticket como pagado y aplicar datos del DTO
    ticket.estado = EstadoTicket.PAGADO;
    Object.assign(ticket, pagarTicketDto);
    const ticketPagado = await this.ticketsRepository.save(ticket);

    // 2. Liberar la mesa automáticamente
    await this.mesasService.cambiarEstado(
      ticket.mesaId,
      EstadoMesa.DISPONIBLE,
    );

    return ticketPagado;
  }
}