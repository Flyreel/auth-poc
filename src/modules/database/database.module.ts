import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { logger } from '../../utils';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        const client = await MongoClient.connect(process.env.MONGODB);

        logger.log('Connected to mongodb');

        return client.db('flyreel');
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
