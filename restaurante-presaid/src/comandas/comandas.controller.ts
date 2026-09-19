import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ComandasService } from './comandas.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateEstadoComandaDto } from './dto/update-estado-comanda.dto';

@Controller('comandas')
export class ComandasController {
  constructor(private readonly comandasService: ComandasService) {}

  @Post()
  create(@Body() createComandaDto: CreateComandaDto) {
    return this.comandasService.create(createComandaDto);
  }

  @Get()
  findAll() {
    return this.comandasService.findAll();
  }

  @Patch(':id/estado')
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstadoComandaDto: UpdateEstadoComandaDto,
  ) {
    return this.comandasService.updateEstado(id, updateEstadoComandaDto);
  }
}