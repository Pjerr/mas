import { BaseEntity } from '@mikro-orm/core';
export declare class Group extends BaseEntity<Group, 'id'> {
    id: string;
    name: string;
    searchableName: string;
    createdAt: Date;
    updatedAt: Date;
}
