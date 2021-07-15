import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { logger } from '../../utils';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        logger.log('Connecting to mongodb...');
        const client = await MongoClient.connect(process.env.MONGO_URI);
        logger.log('Connected to mongodb');

        return client.db('future');
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
