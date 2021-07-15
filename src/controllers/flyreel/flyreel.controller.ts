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
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('flyreels')
export class FlyreelController {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db,
  ) {}

  @Get()
  @Roles('flyreel:list')
  async listFlyreel(): Promise<any> {
    return await this.db.collection('flyreel').find().toArray();
  }

  @Get(':id')
  @Roles('flyreel:read')
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
  @Roles('flyreel:create')
  async createFlyreel(@Body() body): Promise<any> {
    return { newFlyreel: {} };
  }

  @Put(':id')
  @Roles('flyreel:update')
  async updateFlyreel(@Param('id') id: string, @Body() body): Promise<any> {
    return { updatedFlyreel: { _id: id, ...body } };
  }

  @Delete(':id')
  @Roles('flyreel:delete')
  @HttpCode(204)
  async deleteFlyreel(@Param('id') id: string): Promise<void> {
    return;
  }
}
