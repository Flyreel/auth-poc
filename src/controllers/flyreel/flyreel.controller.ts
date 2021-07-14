import { Controller, Get } from '@nestjs/common';

@Controller('flyreel')
export class FlyreelController {
  @Get()
  getFlyreel(): any {
    return { flyreel: {} };
  }
}
