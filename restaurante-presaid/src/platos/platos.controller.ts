import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';

@Controller('platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Post()
  create(@Body() createPlatoDto: CreatePlatoDto) {
    return this.platosService.create(createPlatoDto);
  }

  @Get()
  findAll() {
    return this.platosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlatoDto: UpdatePlatoDto) {
    return this.platosService.update(+id, updatePlatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.platosService.remove(+id);
  }
}
