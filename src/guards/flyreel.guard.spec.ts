import { FlyreelGuard } from './flyreel.guard';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/modules/casl/ability.factory';

describe('FlyreelGuard', () => {
  it('should be defined', () => {
    expect(
      new FlyreelGuard(new Reflector(), new CaslAbilityFactory()),
    ).toBeDefined();
  });
});
