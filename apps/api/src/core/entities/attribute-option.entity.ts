import {
  BaseEntity,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import uuid4 from 'uuid4';
import { Attribute } from './attribute.entity';
import { Filterable } from '../meta/decorators/filter.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { OptionConfig } from './option-config.entity';
@Entity()
export default class AttributeOption extends BaseEntity<AttributeOption, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuid4();

  @Property()
  @Filterable()
  value: string;

  @Property()
  @Unique()
  displayName: string;

  @ManyToOne(() => Attribute, { mapToPk: true })
  @Filterable()
  attribute: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;

  @ApiProperty({ type: [OptionConfig] })
  @OneToMany(() => OptionConfig, (optoinConfig) => optoinConfig.option, {
    orphanRemoval: true,
    nullable: true,
  })
  optionConfigs = new Collection<OptionConfig>(this);
}
