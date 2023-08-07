import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  Enum,
  Formula,
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
import { PartStatus, PropertyType, PublishStatus } from 'shared';
import uuid4 from 'uuid4';
import { Filterable } from '../meta/decorators/filter.decorator';
import { OptionConfig } from './option-config.entity';

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
    type: (type) => [Attribute],
  })
  @ManyToMany(() => Attribute)
  attributes = new Collection<Attribute>(this);

  @Property()
  basePrice: number = 0;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;

  @ApiResponseProperty({
    type: (type) => [OptionConfig],
  })
  @OneToMany(() => OptionConfig, (config) => config.part, {
    nullable: true,
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
  configs = new Collection<OptionConfig>(this);

  @Property({ nullable: true })
  publishStatus: PublishStatus = PublishStatus.Draft;

  @Formula(
    (alias) =>
      `(select count(*) as "count" from "option_config" as "o0" where "o0"."product_id" = ${alias}.id)`,
  )
  configsCount: number;
}
