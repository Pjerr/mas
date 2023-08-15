import { BaseEntity } from '@mikro-orm/core';
export declare class Variant extends BaseEntity<Variant, 'id'> {
    id: string;
    price: number;
    disabled: boolean;
    properties: Record<string, any>;
    part: string;
    createdAt: Date;
}
//# sourceMappingURL=variant.entity.d.ts.map