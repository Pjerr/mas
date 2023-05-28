import { Attribute } from '@/core/entities';
import { QueryPipe } from '@/core/pipes/query.pipe';
import { FilterQuery } from '@/core/types';
import { filterEntity } from '@/core/utils/parse-query';
import { AttributeService } from '@/modules/attribute/attribute.service';
import { CreateAttribute, UpdateAttribute } from '@/modules/attribute/dto';
import {
  AttributeResponse,
  AttributesResponse,
  PartialAttributesResponse,
} from '@/modules/attribute/dto/attribute.response';
import {
  AttributeRelationTypes,
  QueryAttribtue,
} from '@/modules/attribute/dto/requests';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Attributes')
@Controller('attributes')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  async create(@Body() payload: CreateAttribute): Promise<AttributeResponse> {
    const response = await this.attributeService.create(payload);
    return { data: response };
  }

  @Get()
  @FilterQuery('query', QueryAttribtue)
  async find(
    @Query('query', QueryPipe<AttributeRelationTypes, Attribute>)
    query: QueryAttribtue,
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

  @Get(':id/car')
  async findByCar(
    @Param('id') carId: string,
  ): Promise<PartialAttributesResponse> {
    const response = await this.attributeService.findBy(carId);
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
