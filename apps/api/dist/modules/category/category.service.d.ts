import { CreateCategory } from './dto/requests/create-category.request';
import { UpdateCategory } from './dto/requests/update-category.request';
import { Category } from '@/core/entities';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { FilterEntity } from '@/core/types';
import { UpdateRelation } from './dto';
export declare class CategoryService {
    private readonly em;
    private readonly categoryRepository;
    constructor(em: EntityManager, categoryRepository: EntityRepository<Category>);
    create(payload: CreateCategory): Promise<Category>;
    find(filters: FilterEntity<Category>): Promise<import("@mikro-orm/core").Loaded<Category, any>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Category, never>>;
    update(id: string, payload: UpdateCategory): Promise<import("@mikro-orm/core").Loaded<Category, never>>;
    remove(id: string): Promise<void>;
    updateRelation(id: string, payload: UpdateRelation): Promise<import("@mikro-orm/core").Loaded<Category, never>>;
}
//# sourceMappingURL=category.service.d.ts.map