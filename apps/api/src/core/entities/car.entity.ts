import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Car extends BaseEntity<Car, "id">{
    @PrimaryKey()
    id: string

    @Property()
    name: string
}