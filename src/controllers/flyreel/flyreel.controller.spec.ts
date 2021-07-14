import { Test, TestingModule } from '@nestjs/testing';
import { FlyreelController } from './flyreel.controller';

describe('FlyreelController', () => {
  let controller: FlyreelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlyreelController],
    }).compile();

    controller = module.get<FlyreelController>(FlyreelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
