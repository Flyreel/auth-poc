import { Ability } from '@casl/ability';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Body,
  Param,
  Inject,
  BadRequestException,
  NotFoundException,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Db, ObjectId } from 'mongodb';
import { FlyreelGuard } from 'src/guards/flyreel.guard';
import { Flyreel } from 'src/models';
import { CaslAbilityFactory } from 'src/modules/casl';

@UseGuards(FlyreelGuard)
@Controller('flyreels')
export class FlyreelController {
  private ability: Ability;

  constructor(
    @Inject(REQUEST) private request: any,
    @Inject('DATABASE_CONNECTION') private db: Db,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {
    const { user, organizationId } = request.raw;

    this.ability = this.caslAbilityFactory.defineAbilitiesFor(
      user,
      organizationId,
    );
    // console.log('!!!!', this.ability.rules);
  }

  @Get()
  // @Roles('flyreel:list')
  async listFlyreel(): Promise<any> {
    if (!this.ability.can('read', 'Flyreel')) throw new ForbiddenException();

    return await this.db.collection('flyreels').find({}).toArray();
  }

  @Get(':id')
  // @Roles('flyreel:read')
  async getFlyreelById(@Param('id') id: string): Promise<any> {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const flyreel = await this.db.collection('users').findOne({
      _id: new ObjectId(id),
    });

    if (!flyreel) {
      throw new NotFoundException();
    }

    return flyreel;
  }

  @Post()
  // @Roles('flyreel:create')
  async createFlyreel(@Body() body): Promise<any> {
    return { newFlyreel: {} };
  }

  @Put(':id')
  // @Roles('flyreel:update')
  async updateFlyreel(@Param('id') id: string, @Body() body): Promise<any> {
    return { updatedFlyreel: { _id: id, ...body } };
  }

  @Delete(':id')
  // @Roles('flyreel:delete')
  @HttpCode(204)
  async deleteFlyreel(@Param('id') id: string): Promise<void> {
    return;
  }
}
