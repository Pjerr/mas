import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Filterable } from '../meta/decorators/filter.decorator';
import uuid4 from 'uuid4';
import { Part } from './part.entity';

@Entity()
export class Variant extends BaseEntity<Variant, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuid4();

  @Property()
  @Filterable()
  price: number;

  @Property({ type: 'boolean' })
  disabled: boolean = false;

  @Property({ type: 'jsonb', nullable: true })
  properties: Record<string, any>;

  @ManyToOne(() => Part, { mapToPk: true, onDelete: 'cascade' })
  @Filterable()
  part: string;

  @Property()
  createdAt: Date = new Date();
}
