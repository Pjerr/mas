import { BaseEntity, Collection } from '@mikro-orm/core';
import { Attribute } from './attribute.entity';
import { PartStatus, PropertyType } from 'shared';
import { Variant } from './variant.entity';
export declare class Part extends BaseEntity<Part, 'id'> {
    id: string;
    name: string;
    status: PartStatus;
    searchIndex: string;
    properties: Record<string, PropertyType>;
    manufacturer: string;
    category: string;
    attributes: Collection<Attribute, object>;
    basePrice: number;
    variants: Collection<Variant, object>;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=part.entity.d.ts.map