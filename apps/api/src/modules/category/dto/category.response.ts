import { Category } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class CategoryResponse implements EntityResponse<Category> {
  data: Category;
}

export class CategoriesResponse implements EntityResponse<Category[]> {
  data: Category[];
}
