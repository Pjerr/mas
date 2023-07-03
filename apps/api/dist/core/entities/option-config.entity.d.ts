import { BaseEntity, Collection } from '@mikro-orm/core';
import AttributeOption from './attribute-option.entity';
import { Variant } from './variant.entity';
export declare class OptionConfig extends BaseEntity<OptionConfig, 'id'> {
    id: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    option: AttributeOption;
    variants: Collection<Variant, object>;
}
//# sourceMappingURL=option-config.entity.d.ts.map