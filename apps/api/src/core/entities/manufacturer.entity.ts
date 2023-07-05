import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  Index,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Part } from './part.entity';
import uuid4 from 'uuid4';
import { Filterable } from '../meta/decorators/filter.decorator';
import { FullTextType } from '@mikro-orm/postgresql';
@Entity()
export class Manufacturer extends BaseEntity<Manufacturer, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuid4();

  @Property()
  name: string;

  @Index({ type: 'fulltext' })
  @Property({
    type: FullTextType,
    onCreate: (manu: Manufacturer) => manu.name,
    onUpdate: (manu: Manufacturer) => manu.name,
  })
  @Filterable()
  searchIndex: string;

  @OneToMany(() => Part, (part) => part.manufacturer, {
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
