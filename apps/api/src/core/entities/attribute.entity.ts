import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Attribute extends BaseEntity<Attribute, "id">{
    @PrimaryKey({type: "uuid"})
    id: string

    @Property()
    displayName: string
}