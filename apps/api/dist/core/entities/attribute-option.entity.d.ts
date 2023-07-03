import { BaseEntity, Collection } from '@mikro-orm/core';
import { OptionConfig } from './option-config.entity';
export declare class AttributeOption extends BaseEntity<AttributeOption, 'id'> {
    id: string;
    value: string;
    displayName: string;
    attribute: string;
    createdAt: Date;
    updatedAt: Date;
    optionConfigs: Collection<OptionConfig, object>;
}
//# sourceMappingURL=attribute-option.entity.d.ts.map