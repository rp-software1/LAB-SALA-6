import { Test, TestingModule } from '@nestjs/testing';
import { PlatosService } from './platos.service';

describe('PlatosService', () => {
  let service: PlatosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatosService],
    }).compile();

    service = module.get<PlatosService>(PlatosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
