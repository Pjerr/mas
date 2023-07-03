import { BaseEntity, Collection } from '@mikro-orm/core';
import { EditorType, EditorValidation } from 'shared';
import { Group } from './group.entity';
import { Part } from './part.entity';
import AdditionalMetadata from '../types/additional-metadata';
import { AttributeOption } from './attribute-option.entity';
export declare class Attribute extends BaseEntity<Attribute, 'id'> {
    id: string;
    propertyKey: string;
    displayName: string;
    searchIndex: string;
    editorType: EditorType;
    editorValidation: EditorValidation;
    group: Group;
    options: Collection<AttributeOption, object>;
    parts: Collection<Part, object>;
    createdAt: Date;
    updatedAt: Date;
    additionalMetadata?: AdditionalMetadata;
}
//# sourceMappingURL=attribute.entity.d.ts.map