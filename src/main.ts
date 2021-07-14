import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { MongoClient } from 'mongodb';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('auth-poc');
export const mongodbClient = new MongoClient(process.env.mongodb);

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8080;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await mongodbClient.connect();
  logger.log('Connected successfully to mongodb server');

  await app.listen(port, () =>
    logger.log(`Auth-poc is listening on port: ${port}`),
  );
}

bootstrap();
