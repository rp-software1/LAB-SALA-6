import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateResenaDto } from './dto/create-resena.dto';
import { ResenasService } from './resenas.service';

@Controller('resenas')
export class ResenasController {
  constructor(private readonly resenasService: ResenasService) {}

  @Post()
  create(@Body() createResenaDto: CreateResenaDto) {
    return this.resenasService.create(createResenaDto);
  }

  @Get()
  findAll() {
    return this.resenasService.findAll();
  }

  @Get('plato/:platoId')
  findByPlato(@Param('platoId', ParseIntPipe) platoId: number) {
    return this.resenasService.findByPlato(platoId);
  }
}