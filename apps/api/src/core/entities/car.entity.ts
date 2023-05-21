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
import { CarStatus } from 'shared';
import { Manufacturer } from './manufacturer.entity';
import { Category } from './category.entity';
import { Attribute } from './attribute.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class Car extends BaseEntity<Car, 'id'> {
  @PrimaryKey()
  id: string;

  @Property()
  name: string;

  @Enum(() => CarStatus)
  status: CarStatus = CarStatus.InStock;

  @Index({ type: 'fulltext' })
  @Property({
    type: FullTextType,
    onCreate: (car: Car) => car.name,
    onUpdate: (cat: Car) => cat.name,
  })
  searchIndex: string;

  @Property({ type: 'jsonb', nullable: true })
  properties: Record<string, any>;

  @ManyToOne(() => Manufacturer, { mapToPk: true })
  manufacturerId: string;

  @ManyToOne(() => Category, { nullable: true, mapToPk: true })
  categoryId: string;

  @ManyToMany(() => Attribute)
  @ApiResponseProperty({
    type: [Attribute],
  })
  attributes = new Collection<Attribute>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;
}
