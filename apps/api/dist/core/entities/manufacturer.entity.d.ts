import { BaseEntity, Collection } from '@mikro-orm/core';
import { Part } from './part.entity';
export declare class Manufacturer extends BaseEntity<Manufacturer, 'id'> {
    id: string;
    name: string;
    address: string;
    parts: Collection<Part, object>;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=manufacturer.entity.d.ts.map