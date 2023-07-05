import { PropertyMetadata } from '@/lib/metadata';
import { EditorType, EditorValidation } from 'shared';

export const manufacturerMetadata: PropertyMetadata[] = [
    {
        displayName: 'Name',
        isArray: false,
        propertyKey: 'name',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.AY09,
    },
];
