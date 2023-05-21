import { BaseEntity, Collection } from '@mikro-orm/core';
export declare class Category extends BaseEntity<Category, 'id'> {
    id: string;
    name: string;
    searchIndex: string;
    parentId: string;
    children: Collection<Category, object>;
    get childrenIds(): string[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=category.entity.d.ts.map