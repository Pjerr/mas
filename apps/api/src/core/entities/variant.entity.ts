import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { OptionConfig, Part } from '@/core/entities';
import { Filterable } from '@/core/meta/decorators/filter.decorator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import uuid4 from 'uuid4';

@Entity()
export class Variant extends BaseEntity<Variant, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuid4();

  @ManyToOne(() => Part, { hidden: true })
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
