import { BaseEntity, Collection } from '@mikro-orm/core';
import { Attribute } from './attribute.entity';
import { PartStatus } from 'shared';
export declare class Part extends BaseEntity<Part, 'id'> {
    id: string;
    name: string;
    status: PartStatus;
    searchIndex: string;
    properties: Record<string, any>;
    manufacturerId: string;
    categoryId: string;
    attributes: Collection<Attribute, object>;
    basePrice: number;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=part.entity.d.ts.map