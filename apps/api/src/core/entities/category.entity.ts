import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import uuid4 from 'uuid4';
import { Filterable } from '../meta/decorators/filter.decorator';

@Entity()
export class Category extends BaseEntity<Category, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuid4();

  @Property()
  name: string;

  @ManyToOne(() => Category, { nullable: true, mapToPk: true })
  @Filterable()
  parentId: string;

  @ApiHideProperty()
  @OneToMany(() => Category, (category) => category.parentId, {
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
  @Filterable()
  children = new Collection<Category>(this);

  @ApiProperty()
  @Property({ name: 'children_ids', persist: false })
  get childrenIds(): string[] {
    return this.children.isInitialized() ? this.children.getIdentifiers() : [];
  }

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;
}
