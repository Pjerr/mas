import { BaseEntity, Collection } from '@mikro-orm/core';
import { Attribute } from './attribute.entity';
export declare class Group extends BaseEntity<Group, 'id'> {
    id: string;
    name: string;
    searchIndex: string;
    attributes: Collection<Attribute, object>;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=group.entity.d.ts.map