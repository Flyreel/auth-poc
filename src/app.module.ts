import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlyreelController } from './controllers/flyreel/flyreel.controller';
import { FlyreelGuard } from './guards/flyreel.guard';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, FlyreelController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: FlyreelGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
