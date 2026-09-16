import { Test, TestingModule } from '@nestjs/testing';
import { PlatosController } from './platos.controller';
import { PlatosService } from './platos.service';

describe('PlatosController', () => {
  let controller: PlatosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatosController],
      providers: [PlatosService],
    }).compile();

    controller = module.get<PlatosController>(PlatosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
