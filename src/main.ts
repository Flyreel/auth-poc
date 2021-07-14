import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('auth-poc');

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8080;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.listen(port, () =>
    logger.log(`Auth-poc is listening on port: ${port}`),
  );
}

bootstrap();
