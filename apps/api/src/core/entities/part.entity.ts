import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  Enum,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { Manufacturer } from './manufacturer.entity';
import { Category } from './category.entity';
import { Attribute } from './attribute.entity';
import { ApiResponseProperty } from '@nestjs/swagger';
import { PartStatus, PropertyType } from 'shared';
import uuid4 from 'uuid4';
import { Filterable } from '../meta/decorators/filter.decorator';
import { Variant } from './variant.entity';

@Entity()
export class Part extends BaseEntity<Part, 'id'> {
  @PrimaryKey()
  @Filterable()
  id: string = uuid4();

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
  @Filterable()
  searchIndex: string;

  @Property({ type: 'jsonb', nullable: true })
  properties: Record<string, PropertyType>;

  @ManyToOne(() => Manufacturer, { nullable: true, mapToPk: true })
  @Filterable()
  manufacturer: string;

  @ManyToOne(() => Category, { nullable: true, mapToPk: true })
  @Filterable()
  category: string;

  @ApiResponseProperty({
    type: [Attribute],
  })
  @ManyToMany(() => Attribute)
  attributes = new Collection<Attribute>(this);

  @Property()
  basePrice: number = 0;

  @ApiResponseProperty({
    type: [Variant],
  })
  @OneToMany(() => Variant, (variant) => variant.part, {
    nullable: true,
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
  variants = new Collection<Variant>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;
}
