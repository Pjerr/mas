import { Category } from '@/core/entities';
import { EntityResponse } from '@/core/types';
export declare class CategoryResponse implements EntityResponse<Category> {
    data: Category;
    links?: string[];
}
export declare class CategoriesResponse implements EntityResponse<Category[]> {
    data: Category[];
    links?: string[];
}
//# sourceMappingURL=category.response.d.ts.map