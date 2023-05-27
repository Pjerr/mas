import { EditorType, EditorValidation } from 'shared';

export interface PropertyMetadata {
    isArray?: boolean;
    displayName: string;
    propertyKey: string;
    propertyType: EditorType;
    propertyValidation?: EditorValidation;
    additionalMetadata?: AdditionalMetadata;
}

interface AdditionalMetadata {
    selectOptions?: string[];
}
