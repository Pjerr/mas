import { BaseEntity, Collection } from '@mikro-orm/core';
import { Attribute } from './attribute.entity';
import { PartStatus, PropertyType, PublishStatus } from 'shared';
import { OptionConfig } from './option-config.entity';
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
    createdAt: Date;
    updatedAt: Date;
    configs: Collection<OptionConfig, object>;
    publishStatus: PublishStatus;
    configsCount: number;
}
//# sourceMappingURL=part.entity.d.ts.map