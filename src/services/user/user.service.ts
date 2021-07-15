import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { User } from 'src/models';

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

    const user = JSON.parse(
      JSON.stringify(
        await this.db.collection('users').findOne({
          _id: new ObjectId(id),
        }),
      ),
    ) as User;

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
