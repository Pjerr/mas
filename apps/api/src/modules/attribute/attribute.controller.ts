import { Attribute } from '@/core/entities';
import { QueryPipe } from '@/core/pipes/query.pipe';
import { FilterQuery } from '@/core/types';
import { filterEntity } from '@/core/utils/parse-query';
import { AttributeService } from '@/modules/attribute/attribute.service';
import {
  AttributeRelationTypes,
  CreateAttribute,
  QueryAttribute,
  UpdateAttribute,
} from '@/modules/attribute/dto/attribute';
import {
  AttributeResponse,
  AttributesResponse,
  PartialAttributesResponse,
} from '@/modules/attribute/dto/attribute/attribute.response';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from '../auth/guards';

@ApiTags('Attributes')
@Controller('attributes')
@UseGuards(new AuthGuard(), RolesGuard)
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  async create(@Body() payload: CreateAttribute): Promise<AttributeResponse> {
    const response = await this.attributeService.create(payload);
    return { data: response };
  }

  @Get()
  @FilterQuery('query', QueryAttribute)
  async find(
    @Query('query', QueryPipe<AttributeRelationTypes, Attribute>)
    query: QueryAttribute,
  ): Promise<AttributesResponse> {
    const filter = filterEntity<AttributeRelationTypes, Attribute>(
      query,
      Attribute,
    );
    const response = await this.attributeService.find(filter);
    return { data: response };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AttributeResponse> {
    const response = await this.attributeService.findOne(id);
    return { data: response };
  }

  @Get(':id/part')
  async findByPart(
    @Param('id') partId: string,
  ): Promise<PartialAttributesResponse> {
    const response = await this.attributeService.findBy(partId);
    return { data: response };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateAttribute,
  ): Promise<AttributeResponse> {
    const response = await this.attributeService.update(id, payload);
    return { data: response };
  }

  @Delete()
  removeMany(@Query('ids') ids: string[]) {
    return this.attributeService.removeMany(ids);
  }
}
