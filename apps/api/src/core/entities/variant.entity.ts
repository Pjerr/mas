import {
  Entity,
  BaseEntity,
  PrimaryKey,
  ManyToOne,
  ManyToMany,
  Cascade,
  Collection,
  Property,
} from '@mikro-orm/core';
import { ApiResponseProperty, ApiProperty } from '@nestjs/swagger';
import { Filterable } from '../meta/decorators/filter.decorator';
import { OptionConfig } from './option-config.entity';
import { Part } from './part.entity';

@Entity()
export class Variant extends BaseEntity<Variant, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuidv4();

  @ManyToOne({ hidden: true })
  part: Part;

  @ApiResponseProperty({ type: [OptionConfig] })
  @ManyToMany(() => OptionConfig, (optionConfig) => optionConfig.variants, {
    nullable: true,
    cascade: [Cascade.PERSIST],
  })
  optionsConfigs = new Collection<OptionConfig>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;

  @ApiProperty()
  @Property({ name: 'price', persist: false })
  get price(): number {
    return this.optionsConfigs
      .toArray()
      .reduce((sum, config) => sum + config.price, this.part.basePrice);
  }
}
function uuidv4(): string {
  throw new Error('Function not implemented.');
}
