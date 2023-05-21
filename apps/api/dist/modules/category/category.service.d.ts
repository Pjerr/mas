import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@/core/entities';
import { EntityManager } from '@mikro-orm/postgresql';
export declare class CategoryService {
    private readonly em;
    constructor(em: EntityManager);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Category, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Category, never>>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<number>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=category.service.d.ts.map