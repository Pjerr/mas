import { Category } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class CategoryResponse implements EntityResponse<Category> {
  data: Category;
  links?: string[];
}

export class CategoriesResponse implements EntityResponse<Category[]> {
  data: Category[];
  links?: string[];
}
