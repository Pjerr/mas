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
import { ApiResponseProperty } from '@nestjs/swagger';
import { AttributeOption } from './attribute-option.entity';
import { Part } from './part.entity';

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

  @ApiResponseProperty({ type: () => AttributeOption })
  @ManyToOne(() => AttributeOption, { nullable: true })
  option: AttributeOption;

  @ManyToOne(() => Part, { mapToPk: true })
  part: string;
}
