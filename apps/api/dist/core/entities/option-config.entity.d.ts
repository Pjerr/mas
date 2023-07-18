import { BaseEntity, Collection } from '@mikro-orm/core';
import { Variant } from './variant.entity';
import { AttributeOption } from './attribute-option.entity';
export declare class OptionConfig extends BaseEntity<OptionConfig, 'id'> {
    id: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    option: AttributeOption;
    variants: Collection<Variant, object>;
    part: string;
}
//# sourceMappingURL=option-config.entity.d.ts.map