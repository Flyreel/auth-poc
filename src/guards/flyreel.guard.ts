import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
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
    const { user } = context.switchToHttp().getRequest();
    if (requiredRoles.some((role) => user.roles?.includes(role))) return true;

    const ability = this.caslAbilityFactory.createForUser(user);

    // return policyHandlers.every((handler) =>
    //   this.execPolicyHandler(handler, ability),
    // );
  }

  // private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
  //   if (typeof handler === 'function') {
  //     return handler(ability);
  //   }
  //   return handler.handle(ability);
  // }
}
