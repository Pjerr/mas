import { BaseEntity, Collection } from '@mikro-orm/core';
import { OptionConfig } from './option-config.entity';
import { Part } from './part.entity';
export declare class Variant extends BaseEntity<Variant, 'id'> {
    id: string;
    part: Part;
    optionsConfigs: Collection<OptionConfig, object>;
    createdAt: Date;
    updatedAt: Date;
    get price(): number;
}
//# sourceMappingURL=variant.entity.d.ts.map