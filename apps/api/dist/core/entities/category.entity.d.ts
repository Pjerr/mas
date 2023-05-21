import { BaseEntity } from '@mikro-orm/core';
export declare class Category extends BaseEntity<Category, 'id'> {
    id: string;
    name: string;
}
