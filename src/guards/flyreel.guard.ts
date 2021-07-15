import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { User, UserOrganization } from 'src/models';
import {
  AppAbility,
  CaslAbilityFactory,
} from 'src/modules/casl/ability.factory';
import { UserService } from 'src/services/user/user.service';
import { logger } from 'src/utils';

@Injectable()
export class FlyreelGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const requiredRoles = this.reflector.get<string[]>(
    //   ROLES_KEY,
    //   context.getHandler(),
    // );
    // if (!requiredRoles) {
    //   return true;
    // }

    const request = context.switchToHttp().getRequest();
    const { userid: userId } = request.headers;

    const user = await this.userService.getUser(userId as string);

    const { organization } = request;

    const ability = this.caslAbilityFactory.createForUser(user, organization);

    // return policyHandlers.every((handler) =>
    //   this.execPolicyHandler(handler, ability),
    // );

    return true;
  }

  // private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
  //   if (typeof handler === 'function') {
  //     return handler(ability);
  //   }
  //   return handler.handle(ability);
  // }
}
