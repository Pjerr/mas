import { PropertyMetadata } from '@/lib/metadata';
import { EditorType, EditorValidation } from 'shared';

export const attributeMetadata: PropertyMetadata[] = [
    {
        displayName: 'Display name',
        isArray: false,
        propertyKey: 'displayName',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.Text,
    },
    {
        displayName: 'Editor type',
        isArray: false,
        propertyKey: 'editorType',
        propertyType: EditorType.Select,
        additionalMetadata: {
            selectOptions: Object.values(EditorType)
                .filter((type) => type != EditorType.Button)
                .map((value) => ({ label: value, value })),
        },
    },
];

export const selectOptions: PropertyMetadata = {
    displayName: 'Select options',
    isArray: false,
    propertyKey: 'additionalMetadata.selectOptions',
    propertyType: EditorType.Button,
};

export const optionsFormMetadata: PropertyMetadata[] = [
    {
        displayName: 'Value',
        isArray: false,
        propertyKey: 'value',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.Text,
    },
    {
        displayName: 'Display Name',
        isArray: false,
        propertyKey: 'displayName',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.Text,
    },
];
