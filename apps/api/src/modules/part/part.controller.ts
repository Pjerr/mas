import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { PartService } from './part.service';
import { UpdatePart } from './dto/requests/update-part.request';
import {
  CreatePart,
  MultipeCreatePart,
  MultipleUpdatePart,
  PartRelationTypes,
  PartResponse,
  PartsResponse,
  QueryPart,
  UpdateAttributeRelation,
  UpdateAttributeRelations,
  UpdateCategoryRelation,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterQuery } from '@/core/types';
import { QueryPipe } from '@/core/pipes/query.pipe';
import { Part } from '@/core/entities';
import { filterEntity } from '@/core/utils/parse-query';

@ApiTags('Parts')
@Controller('parts')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post()
  async create(
    @Body(ValidationPipe) payload: CreatePart,
  ): Promise<PartResponse> {
    const response = await this.partService.create(payload);
    return { data: response };
  }

  @Post('multiple')
  async multipleCreate(
    @Body(ValidationPipe) request: MultipeCreatePart,
  ): Promise<PartsResponse> {
    const response = await this.partService.multipleCreate(request.payloads);
    return { data: response };
  }

  @Get()
  @FilterQuery('query', QueryPart)
  async find(
    @Query('query', QueryPipe<PartRelationTypes, Part>) query: QueryPart,
  ): Promise<PartsResponse> {
    const filter = filterEntity<PartRelationTypes, Part>(query, Part);
    const response = await this.partService.find(filter);
    return { data: response };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PartResponse> {
    const response = await this.partService.findOne(id);
    return { data: response };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) payload: UpdatePart,
  ): Promise<PartResponse> {
    const response = await this.partService.update(id, payload);
    return { data: response };
  }

  @Patch()
  async multipleUpdate(
    @Query('ids') ids: string[],
    @Body(ValidationPipe) request: MultipleUpdatePart,
  ): Promise<PartsResponse> {
    const response = await this.partService.multipleUpdate(
      ids,
      request.payloads,
    );
    return { data: response };
  }

  @Patch(':id/relationships/category')
  async addCategory(
    @Param('id') id: string,
    @Body(ValidationPipe) payload: UpdateCategoryRelation,
  ): Promise<PartResponse> {
    const response = await this.partService.addCategory(id, payload.categoryId);
    return { data: response };
  }

  @Patch(':id/relationships/attribute')
  async addAttribute(
    @Param('id') id: string,
    @Body(ValidationPipe) payload: UpdateAttributeRelation,
  ): Promise<PartResponse> {
    const response = await this.partService.addAttribute(
      id,
      payload.attributeId,
    );
    return { data: response };
  }

  @Delete(':id/relationships/attribute')
  async removeAttribute(
    @Param('id') id: string,
    @Body(ValidationPipe) payload: UpdateAttributeRelation,
  ): Promise<PartResponse> {
    const response = await this.partService.removeAttribute(
      id,
      payload.attributeId,
    );
    return { data: response };
  }

  @Delete(':id/relationships/attributes')
  async removeAttributes(
    @Param('id') id: string,
    @Body(ValidationPipe) payload: UpdateAttributeRelations,
  ): Promise<PartResponse> {
    const response = await this.partService.removeAttributes(
      id,
      payload.attributeIds,
    );
    return { data: response };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partService.remove(id);
  }

  @Delete()
  removeMany(@Query('ids') ids: string[]) {
    return this.partService.removeMany(ids);
  }
}
