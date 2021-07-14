import { Test, TestingModule } from '@nestjs/testing';
import { FlyreelController } from './flyreel.controller';

describe('AppController', () => {
  let appController: FlyreelController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlyreelController],
      // providers: [AppService],
    }).compile();

    appController = app.get<FlyreelController>(FlyreelController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getFlyreel()).toBe('Hello World!');
    });
  });
});
