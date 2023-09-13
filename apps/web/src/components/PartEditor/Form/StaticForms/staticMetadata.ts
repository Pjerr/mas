import { PropertyMetadata } from '@/lib/metadata';
import { EditorType, EditorValidation, PartStatus } from 'shared';

export const metadata: PropertyMetadata[] = [
    {
        displayName: 'Name',
        isArray: false,
        propertyKey: 'name',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.Text,
    },
    {
        displayName: 'Status',
        isArray: false,
        propertyKey: 'status',
        propertyType: EditorType.Select,
        propertyValidation: EditorValidation.None,
        additionalMetadata: {
            selectOptions: Object.values(PartStatus).map((value) => ({
                label: value,
                value: value,
            })),
        },
    },
    {
        displayName: 'Base price',
        isArray: false,
        propertyKey: 'basePrice',
        propertyType: EditorType.Number,
        propertyValidation: EditorValidation.Number,
    },
];
