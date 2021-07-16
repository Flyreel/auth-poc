import { Ability } from '@casl/ability';
import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
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
import { logger } from 'src/utils';

@UseGuards(FlyreelGuard)
@Controller('flyreels')
export class FlyreelController {
  private ability: Ability;
  private organizationId: string;

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
    this.organizationId = organizationId;
    // console.log('!!!!', this.ability.rules);
  }

  @Get()
  async listFlyreel(): Promise<Flyreel[]> {
    if (
      !this.ability.can(
        'read',
        new Flyreel(
          '60f05cbe4e8a18f1d8a8f436',
          '60f05cbe4e8a18f1d8a8f436',
          '60f05cbe4e8a18f1d8a8f436',
          'started',
          new Date('2022-08-03 18:00:00.000Z'),
        ),
        'status',
      )
    )
      throw new ForbiddenException();

    return await this.db
      .collection('flyreels')
      .find({ organizationId: new ObjectId(this.organizationId) })
      .toArray();
  }

  @Get(':id')
  async getFlyreelById(@Param('id') id: string): Promise<Flyreel> {
    if (!this.ability.can('read', 'Flyreel')) throw new ForbiddenException();

    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const flyreel = await this.db.collection('flyreels').findOne({
      _id: new ObjectId(id),
      organizationId: new ObjectId(this.organizationId),
    });

    if (!flyreel) {
      throw new NotFoundException();
    }

    return flyreel as Flyreel;
  }

  @Post()
  async createFlyreel(@Body() body): Promise<any> {
    if (!this.ability.can('create', 'Flyreel')) throw new ForbiddenException();

    const result = await this.db.collection('flyreels').insertOne({
      ...body,
      organizationId: new ObjectId(this.organizationId),
    });

    return JSON.parse(JSON.stringify(result));
  }

  @Patch(':id')
  async updateFlyreel(@Param('id') id: string, @Body() body): Promise<any> {
    if (!this.ability.can('update', 'Flyreel', 'organizationId'))
      throw new ForbiddenException();

    if (!ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    return { updatedFlyreel: { _id: id, ...body } };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteFlyreel(@Param('id') id: string): Promise<void> {
    return;
  }
}
