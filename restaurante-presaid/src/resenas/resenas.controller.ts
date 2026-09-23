import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateResenaDto } from './dto/create-resena.dto';
import { ResenasService } from './resenas.service';

@Controller('platos/:id/resenas')
export class ResenasController {
  constructor(private readonly resenasService: ResenasService) {}

  @Post()
  create(
    @Param('id', ParseIntPipe) platoId: number,
    @Body() createResenaDto: CreateResenaDto,
  ) {
    return this.resenasService.create(platoId, createResenaDto);
  }

  @Get()
  findByPlato(@Param('id', ParseIntPipe) platoId: number) {
    return this.resenasService.findByPlato(platoId);
  }
}