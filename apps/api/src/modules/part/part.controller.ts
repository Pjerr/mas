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
  BulkUpdatePrice,
  CreateDraft,
  CreatePart,
  CreateVariant,
  PartRelationTypes,
  PartResponse,
  PartsResponse,
  QueryPart,
  UpdateAttributeRelation,
  UpdateAttributeRelations,
  UpdateCategoryRelation,
  VariantsResponse,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterQuery } from '@/core/types';
import { QueryPipe } from '@/core/pipes/query.pipe';
import { Part } from '@/core/entities';
import { filterEntity } from '@/core/utils/parse-query';
import { VariantService } from './variant.service';
import {
  FilterRelationTypes,
  QueryVariant,
} from './dto/requests/filter-variants.request';
import { Variant } from '@/core/entities/variant.entity';

@ApiTags('Parts')
@Controller('parts')
export class PartController {
  constructor(
    private readonly partService: PartService,
    private readonly variantService: VariantService,
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) request: CreatePart,
  ): Promise<PartResponse> {
    const part = await this.partService.create(request);
    return { data: part };
  }

  @Post('draft')
  async createDraft(@Body() request: CreateDraft): Promise<PartResponse> {
    const response = await this.partService.createDraft(request);
    return { data: response };
  }

  @Get('findPartVariants')
  @FilterQuery('query', QueryVariant)
  async findVariants(
    @Query('query', QueryPipe<FilterRelationTypes, Variant>)
    query: QueryVariant,
  ): Promise<VariantsResponse> {
    const filter = filterEntity<FilterRelationTypes, Variant>(query, Variant);
    const response = await this.variantService.find(filter);
    return { data: response };
  }

  @Get()
  @FilterQuery('query', QueryPart)
  async find(
    @Query('query', QueryPipe<PartRelationTypes, Part>) query: QueryPart,
  ): Promise<PartsResponse> {
    console.log('ALO');
    const filter = filterEntity<PartRelationTypes, Part>(query, Part);
    const response = await this.partService.find(filter);
    return { data: response };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PartResponse> {
    const response = await this.partService.findOne(id);
    return { data: response };
  }

  @Patch('bulk-update')
  async bulkUpdatePrice(
    @Query('ids') ids: string[],
    @Body() request: BulkUpdatePrice,
  ): Promise<PartsResponse> {
    const response = await this.partService.bulkUpdatePrice(
      ids,
      request.payloads,
    );
    return { data: response };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) payload: UpdatePart,
  ): Promise<PartResponse> {
    const part = await this.partService.update(id, payload);
    return { data: part };
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

  @Post('createVariants')
  async createVariants(@Body() payload: CreateVariant) {
    const response = await this.variantService.create(payload.partId);
    return { data: response };
  }
}
