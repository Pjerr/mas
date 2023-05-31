import { CategoryService } from './category.service';
import { CreateCategory } from './dto/requests/create-category.request';
import { UpdateCategory } from './dto/requests/update-category.request';
import { CategoriesResponse, CategoryResponse, QueryCategory, UpdateRelation } from './dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(payload: CreateCategory): Promise<CategoryResponse>;
    find(query: QueryCategory): Promise<CategoriesResponse>;
    findOne(id: string): Promise<CategoryResponse>;
    update(id: string, payload: UpdateCategory): Promise<CategoryResponse>;
    remove(id: string): Promise<void>;
    updateRelation(id: string, payload: UpdateRelation): Promise<CategoryResponse>;
}
//# sourceMappingURL=category.controller.d.ts.map