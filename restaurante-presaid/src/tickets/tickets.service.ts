import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mesa } from '../mesas/mesa.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PagarTicketDto } from './dto/pagar-ticket.dto';
import { EstadoTicket, Ticket } from './entities/ticket.entity';

type TicketConPedidos = Ticket & { pedidos: Pedido[] };

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<TicketConPedidos> {
    const mesa = await this.mesaRepository.findOne({
      where: { id: createTicketDto.mesaId },
    });

    if (!mesa) {
      throw new BadRequestException(
        `La mesa con ID ${createTicketDto.mesaId} no existe.`,
      );
    }

    const pedidos = await this.findPedidosByMesa(mesa.id);
    if (pedidos.length === 0) {
      throw new BadRequestException(
        `La mesa con ID ${mesa.id} no tiene pedidos.`,
      );
    }

    const total = pedidos.reduce((sum, pedido) => sum + Number(pedido.total), 0);
    const ticket = await this.ticketRepository.save(
      this.ticketRepository.create({
        mesaId: mesa.id,
        mesa,
        total,
        metodoPago: null,
        estado: EstadoTicket.ABIERTO,
      }),
    );

    return { ...ticket, pedidos };
  }

  async findOne(id: number): Promise<TicketConPedidos> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: { mesa: true },
    });

    if (!ticket) {
      throw new NotFoundException(`El ticket con ID ${id} no fue encontrado.`);
    }

    const pedidos = await this.findPedidosByMesa(ticket.mesaId);
    return { ...ticket, pedidos };
  }

  async pagar(id: number, pagarTicketDto: PagarTicketDto): Promise<TicketConPedidos> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: { mesa: true },
    });

    if (!ticket) {
      throw new NotFoundException(`El ticket con ID ${id} no fue encontrado.`);
    }

    ticket.estado = EstadoTicket.PAGADO;
    ticket.metodoPago = pagarTicketDto.metodoPago;
    await this.ticketRepository.save(ticket);

    const pedidos = await this.findPedidosByMesa(ticket.mesaId);
    return { ...ticket, pedidos };
  }

  private findPedidosByMesa(mesaId: number): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { mesaId },
      relations: { mesa: true, platos: true },
      order: { createdAt: 'ASC' },
    });
  }
}