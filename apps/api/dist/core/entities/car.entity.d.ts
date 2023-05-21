import { BaseEntity, Collection } from '@mikro-orm/core';
import { CarStatus } from 'shared';
import { Attribute } from './attribute.entity';
export declare class Car extends BaseEntity<Car, 'id'> {
    id: string;
    name: string;
    status: CarStatus;
    searchIndex: string;
    properties: Record<string, any>;
    manufacturerId: string;
    categoryId: string;
    attributes: Collection<Attribute, object>;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=car.entity.d.ts.map