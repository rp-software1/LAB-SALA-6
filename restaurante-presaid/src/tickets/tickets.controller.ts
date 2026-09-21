import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { PagarTicketDto } from './dto/pagar-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id/pagar')
  pagar(
    @Param('id', ParseIntPipe) id: number,
    @Body() pagarTicketDto: PagarTicketDto,
  ) {
    return this.ticketsService.pagar(id, pagarTicketDto);
  }
}