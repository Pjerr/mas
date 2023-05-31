import { PropertyMetadata } from '@/lib/metadata';
import { EditorType, EditorValidation } from 'shared';

export const attributeMetadata: PropertyMetadata[] = [
    {
        displayName: 'Display name',
        isArray: false,
        propertyKey: 'displayName',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.AY09,
    },
    {
        displayName: 'Editor type',
        isArray: false,
        propertyKey: 'editorType',
        propertyType: EditorType.Select,
        additionalMetadata: {
            selectOptions: Object.values(EditorType).filter(
                (type) => type != EditorType.Button
            ),
        },
    },
    {
        displayName: 'Editor validation',
        isArray: false,
        propertyKey: 'editorValidation',
        propertyType: EditorType.Select,
        additionalMetadata: {
            selectOptions: Object.values(EditorValidation),
        },
        propertyValidation: EditorValidation.None,
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
        propertyValidation: EditorValidation.AY09,
    },
    {
        displayName: 'Price',
        isArray: false,
        propertyKey: 'price',
        propertyType: EditorType.Number,
        propertyValidation: EditorValidation.DecimalNumber,
    },
    {
        displayName: 'SKU',
        isArray: false,
        propertyKey: 'sku',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.AY09,
    },
    {
        displayName: 'Display Name',
        isArray: false,
        propertyKey: 'displayName',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.AY09,
    },
];
