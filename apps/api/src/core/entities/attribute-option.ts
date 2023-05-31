import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { uuid4 } from 'uuid4';
import { Attribute } from './attribute.entity';
@Entity()
export default class AttributeOption extends BaseEntity<AttributeOption, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid4();

  @Property()
  value: string;

  @Property()
  @Unique()
  sku: string;

  @Property()
  @Unique()
  displayName: string;

  @ManyToOne(() => Attribute, { mapToPk: true })
  attributeId: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;
}
