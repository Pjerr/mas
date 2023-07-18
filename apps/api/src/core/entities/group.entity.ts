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
import { FullTextType } from '@mikro-orm/postgresql';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Attribute } from './attribute.entity';
import uuid4 from 'uuid4';
import { Filterable } from '../meta/decorators/filter.decorator';

@Entity()
export class Group extends BaseEntity<Group, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuid4();

  @Property()
  name: string;

  @Index({ type: 'fulltext' })
  @Property({
    type: FullTextType,
    onCreate: (group: Group) => group.name,
    onUpdate: (group: Group) => group.name,
    nullable: true,
  })
  @Filterable()
  searchIndex: string;

  @ApiResponseProperty({ type: (type) => [Attribute] })
  @OneToMany(() => Attribute, (attribute) => attribute.group, {
    nullable: true,
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
  attributes = new Collection<Attribute>(this);

  @Property({ nullable: true })
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;
}
