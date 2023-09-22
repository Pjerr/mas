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
import { CategoryService } from './category.service';
import { CreateCategory } from './dto/requests/create-category.request';
import { UpdateCategory } from './dto/requests/update-category.request';
import { ApiTags } from '@nestjs/swagger';
import {
  CategoriesResponse,
  CategoryRelationTypes,
  CategoryResponse,
  QueryCategory,
  UpdateRelation,
} from './dto';
import { FilterQuery } from '@/core/types';
import { QueryPipe } from '@/core/pipes/query.pipe';
import { Category } from '@/core/entities';
import { filterEntity } from '@/core/utils/parse-query';
import { AuthGuard, RolesGuard } from '../auth/guards';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(new AuthGuard(), RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() payload: CreateCategory): Promise<CategoryResponse> {
    const response = await this.categoryService.create(payload);
    return { data: response };
  }

  @Get()
  @FilterQuery('query', QueryCategory)
  async find(
    @Query('query', QueryPipe<CategoryRelationTypes, Category>)
    query: QueryCategory,
  ): Promise<CategoriesResponse> {
    const filter = filterEntity<CategoryRelationTypes, Category>(
      query,
      Category,
    );
    const response = await this.categoryService.find(filter);
    return { data: response };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponse> {
    const response = await this.categoryService.findOne(id);
    return { data: response };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateCategory,
  ): Promise<CategoryResponse> {
    const response = await this.categoryService.update(id, payload);
    return { data: response };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }

  @Patch(':id/relathionships/category')
  async updateRelation(
    @Param('id') id: string,
    @Body() payload: UpdateRelation,
  ): Promise<CategoryResponse> {
    const response = await this.categoryService.updateRelation(id, payload);
    return { data: response };
  }
}
