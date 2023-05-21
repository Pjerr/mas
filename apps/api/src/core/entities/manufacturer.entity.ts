import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Car } from './car.entity';
@Entity()
export class Manufacturer extends BaseEntity<Manufacturer, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @Property()
  address: string;

  @OneToMany(() => Car, (car) => car.manufacturerId, {
    nullable: true,
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
  cars = new Collection<Car>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;
}
