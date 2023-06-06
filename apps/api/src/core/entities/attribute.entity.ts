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
  Unique,
} from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import uuid4 from 'uuid4';
import { EditorType, EditorValidation } from 'shared';
import { Group } from './group.entity';
import AttributeOption from './attribute-option';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Part } from './part.entity';
import AdditionalMetadata from '../types/additional-metadata';
import { Filterable } from '../meta/decorators/filter.decorator';
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

  @Index({ type: 'fulltext' })
  @Property({
    type: FullTextType,
    onUpdate: (attribute: Attribute) => attribute.displayName,
    onCreate: (attribute: Attribute) => attribute.displayName,
  })
  @Filterable()
  searchIndex: string;

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
  @ApiResponseProperty({
    type: [AttributeOption],
  })
  @Filterable()
  options = new Collection<AttributeOption>(this);

  @ManyToMany(() => Part, (part) => part.attributes)
  @ApiResponseProperty({
    type: [Part],
  })
  @Filterable()
  parts = new Collection<Part>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updatedAt: Date;

  @Property({ type: 'jsonb', nullable: true })
  additionalMetadata?: AdditionalMetadata;
}
