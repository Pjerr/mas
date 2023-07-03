import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { ApiTags } from '@nestjs/swagger';
import { QueryPipe } from '@/core/pipes/query.pipe';
import { AttributeOption } from '@/core/entities';
import { FilterQuery } from '@/core/types';
import { filterEntity } from '@/core/utils/parse-query';
import {
  CreateOption,
  OptionResponse,
  QueryOption,
  OptionRelationTypes,
  OptionsResponse,
} from '@/modules/attribute/dto/option';

@ApiTags('Options')
@Controller('options')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  async create(@Body() payload: CreateOption): Promise<OptionResponse> {
    const response = await this.optionService.create(payload);
    return { data: response };
  }

  @Get()
  @FilterQuery('query', QueryOption)
  async find(
    @Query('query', QueryPipe<OptionRelationTypes, AttributeOption>)
    query: QueryOption,
  ): Promise<OptionsResponse> {
    const filter = filterEntity<OptionRelationTypes, AttributeOption>(
      query,
      AttributeOption,
    );
    const response = await this.optionService.find(filter);
    return { data: response };
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //     const response = await this.optionService.findOne(id);
  //     return { data: response };
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() payload: UpdateOption) {
  //     const response = await this.optionService.update(id, payload);
  //     return { data: response };
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(id);
  }

  // @Patch(':id/relationships/attribute')
  // async updateRelation(
  //     @Param('id') id: ID,
  //     @Body() payload: UpdateAttributeRelation
  // ): Promise<OptionResponse> {
  //     const response = await this.optionService.updateAttributeRelation(
  //         id,
  //         payload.attributeId
  //     );
  //     return { data: response };
  // }

  @Delete()
  removeMany(@Query('ids') ids: string[]) {
    return this.optionService.removeMany(ids);
  }
}
