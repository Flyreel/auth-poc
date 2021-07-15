import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { User, UserOrganization } from 'src/models';
import {
  AppAbility,
  CaslAbilityFactory,
} from 'src/modules/casl/ability.factory';

@Injectable()
export class FlyreelGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const { organization } = request;
    const userOrganization = user.organizations.filter(
      (o) => o._id === organization,
    ) as UserOrganization[];
    if (!userOrganization?.length) return false;

    const ability = this.caslAbilityFactory.createForUser(user);

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
