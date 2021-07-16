import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { User } from 'src/models';
import { logger } from 'src/utils';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  async getUser(id: string): Promise<User> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }
    const userDoc = await this.db.collection('users').findOne({
      _id: new ObjectId(id),
    });

    if (!userDoc) {
      logger.error(`User ${id} does not exist`);
      throw new NotFoundException();
    }

    return JSON.parse(JSON.stringify(userDoc));
  }
}
