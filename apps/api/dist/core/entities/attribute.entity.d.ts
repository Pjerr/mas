import { BaseEntity } from '@mikro-orm/core';
export declare class Attribute extends BaseEntity<Attribute, 'id'> {
    id: string;
    propertyKey: string;
    displayName: string;
    searchIndex: string;
}
