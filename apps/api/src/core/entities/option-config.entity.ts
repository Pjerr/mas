import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Filterable } from '../meta/decorators/filter.decorator';
import uuid4 from 'uuid4';
import AttributeOption from './attribute-option.entity';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Variant } from './variant.entity';

@Entity()
export class OptionConfig extends BaseEntity<OptionConfig, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuid4();

  @Property()
  price: number = 0;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;

  @ManyToOne(() => AttributeOption)
  option: AttributeOption;

  @ApiResponseProperty({ type: [Variant] })
  @ManyToMany(() => Variant)
  variants = new Collection<Variant>(this);
}
