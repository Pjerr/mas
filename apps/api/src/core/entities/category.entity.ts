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

@Entity()
export class Category extends BaseEntity<Category, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid4();

  @Property()
  name: string;

  @Index({ type: 'fulltext' })
  @Property({
    type: FullTextType,
    onCreate: (category: Category) => category.name,
    onUpdate: (category: Category) => category.name,
  })
  searchIndex: string;

  @ManyToOne(() => Category, { nullable: true, mapToPk: true })
  parentId: string;

  @ApiHideProperty()
  @OneToMany(() => Category, (category) => category.parentId, {
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
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
