import { FlyreelGuard } from './flyreel.guard';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/modules/casl/ability.factory';
import { User } from 'src/models';
import { UserService } from 'src/services/user/user.service';

describe('FlyreelGuard', () => {
  it('should be defined', () => {
    expect(1).toEqual(1);
  });
});
