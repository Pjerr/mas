import {
  BaseEntity,
  Collection,
  Entity,
  Enum,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { Manufacturer } from './manufacturer.entity';
import { Category } from './category.entity';
import { Attribute } from './attribute.entity';
import { ApiResponseProperty } from '@nestjs/swagger';
import { PartStatus } from 'shared';

@Entity()
export class Part extends BaseEntity<Part, 'id'> {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @Enum(() => PartStatus)
  status: PartStatus = PartStatus.InStock;

  @Index({ type: 'fulltext' })
  @Property({
    type: FullTextType,
    onCreate: (part: Part) => part.name,
    onUpdate: (part: Part) => part.name,
  })
  searchIndex: string;

  @Property({ type: 'jsonb', nullable: true })
  properties: Record<string, any>;

  @ManyToOne(() => Manufacturer, { mapToPk: true, onDelete: 'cascade' })
  manufacturerId: string;

  @ManyToOne(() => Category, { nullable: true, mapToPk: true })
  categoryId: string;

  @ManyToMany(() => Attribute)
  @ApiResponseProperty({
    type: [Attribute],
  })
  attributes = new Collection<Attribute>(this);

  @Property()
  basePrice: number = 0;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;
}
