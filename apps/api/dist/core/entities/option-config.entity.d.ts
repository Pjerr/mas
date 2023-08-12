import { BaseEntity } from '@mikro-orm/core';
import { AttributeOption } from './attribute-option.entity';
export declare class OptionConfig extends BaseEntity<OptionConfig, 'id'> {
    id: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    option: AttributeOption;
    part: string;
}
//# sourceMappingURL=option-config.entity.d.ts.map