import { BaseEntity, Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';


@Entity()
export class Group extends BaseEntity<Group, "id">{
    @PrimaryKey({type: "uuid"})
    id: string;

    @Property()
    name: string;

    @Index({type: "fulltext"})
    @Property({
        type: FullTextType,
        onCreate: (group: Group) => group.name,
        onUpdate: (group: Group) => group.name,
        nullable: true
    })
    searchableName: string;

    @Property({nullable: true})
    createdAt: Date = new Date();

    @Property({nullable: true, onUpdate: () => new Date()})
    updatedAt: Date
}