import { BaseEntity } from '@mikro-orm/core';
export default class AttributeOption extends BaseEntity<AttributeOption, 'id'> {
    id: string;
    value: string;
    sku: string;
    displayName: string;
    attributeId: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=attribute-option.d.ts.map