import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Part } from './part.entity';
import uuid4 from 'uuid4';
@Entity()
export class Manufacturer extends BaseEntity<Manufacturer, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid4();

  @Property()
  name: string;

  @Property()
  address: string;

  @OneToMany(() => Part, (part) => part.manufacturerId, {
    nullable: true,
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
  parts = new Collection<Part>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;
}
