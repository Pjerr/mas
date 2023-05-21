import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("../../core/entities").Category>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Category, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Category, never>>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<number>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=category.controller.d.ts.map