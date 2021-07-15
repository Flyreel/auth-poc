import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    // const { userid: userId } = req.headers;

    // const user = await this.userService.getUser(userId as string);
    // req['user'] = user;
    // console.log('req user', JSON.stringify(req['user']));
    next();
  }
}
