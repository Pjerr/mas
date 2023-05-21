import {
  BaseEntity,
  Entity,
  Enum,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { uuid4 } from 'uuid4';
import { EditorType, EditorValidation } from 'shared';
import { Group } from './group.entity';
@Entity()
export class Attribute extends BaseEntity<Attribute, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuid4;

  @Property()
  @Unique()
  propertyKey: string;

  @Property()
  displayName: string;

  @Index({ type: 'fulltext' })
  @Property({
    type: FullTextType,
    onUpdate: (attribute: Attribute) => attribute.displayName,
    onCreate: (attribute: Attribute) => attribute.displayName,
  })
  searchIndex: string;

  @Enum(() => EditorType)
  editorType = EditorType.Text;

  @Enum(() => EditorValidation)
  editorValidation = EditorValidation.None;

  @ManyToOne(() => Group)
  group: Group;
}
