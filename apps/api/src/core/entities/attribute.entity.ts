import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import uuid4 from 'uuid4';
import { EditorType, EditorValidation } from 'shared';
import { Group } from './group.entity';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Part } from './part.entity';
import AdditionalMetadata from '../types/additional-metadata';
import { Filterable } from '../meta/decorators/filter.decorator';
import { AttributeOption } from './attribute-option.entity';
@Entity()
export class Attribute extends BaseEntity<Attribute, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  @Filterable()
  id: string = uuid4();

  @Property()
  @Filterable()
  @Unique()
  propertyKey: string;

  @Property()
  @Filterable()
  displayName: string;

  @Enum(() => EditorType)
  editorType = EditorType.Text;

  @Enum(() => EditorValidation)
  editorValidation = EditorValidation.None;

  @ManyToOne(() => Group)
  @Filterable()
  group: Group;

  @OneToMany(() => AttributeOption, (option) => option.attribute, {
    nullable: true,
    orphanRemoval: true,
    cascade: [Cascade.PERSIST],
  })
  @Filterable()
  @ApiResponseProperty({
    type: [AttributeOption],
  })
  options = new Collection<AttributeOption>(this);

  @ManyToMany(() => Part, (part) => part.attributes)
  @Filterable()
  @ApiResponseProperty({
    type: [Part],
  })
  parts = new Collection<Part>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;

  @Property({ type: 'jsonb', nullable: true })
  additionalMetadata?: AdditionalMetadata;
}
