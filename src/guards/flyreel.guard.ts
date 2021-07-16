import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class FlyreelGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user, organizationId } = request.raw;

    if (
      !user?.organizations?.length ||
      !user.organizations.some((o) => o._id === organizationId)
    ) {
      return false;
    }

    return true;
  }
}
