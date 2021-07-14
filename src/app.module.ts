import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlyreelController } from './controllers/flyreel/flyreel.controller';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, FlyreelController],
  providers: [AppService],
})
export class AppModule {}
