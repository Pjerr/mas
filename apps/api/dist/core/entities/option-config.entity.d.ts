import { BaseEntity, Collection } from '@mikro-orm/core';
import { Variant } from './variant.entity';
export declare class OptionConfig extends BaseEntity<OptionConfig, 'id'> {
    id: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    option: string;
    variants: Collection<Variant, object>;
    part: string;
}
//# sourceMappingURL=option-config.entity.d.ts.map