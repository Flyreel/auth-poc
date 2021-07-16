import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlyreelController } from './controllers/flyreel/flyreel.controller';
import { FlyreelGuard } from './guards/flyreel.guard';
import { AuthMiddleware } from './middlewares';
import { CaslModule } from './modules/casl/casl.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserService } from './services/user/user.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CaslModule],
  controllers: [AppController, FlyreelController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: FlyreelGuard,
    },
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'flyreels', method: RequestMethod.ALL });
  }
}
