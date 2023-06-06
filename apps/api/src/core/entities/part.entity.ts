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
import uuid4 from 'uuid4';
import { Filterable } from '../meta/decorators/filter.decorator';

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
  properties: Record<string, any>;

  @ManyToOne(() => Manufacturer, {
    nullable: true,
    mapToPk: true,
    onDelete: 'cascade',
  })
  manufacturerId: string;

  @ManyToOne(() => Category, {
    nullable: true,
    mapToPk: true,
    onDelete: 'cascade',
  })
  @Filterable()
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
