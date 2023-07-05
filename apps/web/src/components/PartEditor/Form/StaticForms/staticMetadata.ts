import { PropertyMetadata } from '@/lib/metadata';
import { EditorType, EditorValidation, PartStatus } from 'shared';

export const metadata: PropertyMetadata[] = [
    {
        displayName: 'Name',
        isArray: false,
        propertyKey: 'name',
        propertyType: EditorType.Text,
        propertyValidation: EditorValidation.AY09,
    },
    {
        displayName: 'Status',
        isArray: false,
        propertyKey: 'status',
        propertyType: EditorType.Select,
        propertyValidation: EditorValidation.None,
        additionalMetadata: {
            selectOptions: Object.values(PartStatus),
        },
    },
    {
        displayName: 'Base price',
        isArray: false,
        propertyKey: 'basePrice',
        propertyType: EditorType.Number,
        propertyValidation: EditorValidation.DecimalNumber,
    },
    {
        displayName: 'Manufacturer',
        isArray: true,
        propertyKey: 'manufacturer',
        propertyType: EditorType.Select,
        propertyValidation: EditorValidation.Array,
        additionalMetadata: {
            selectOptions: ['AMD', 'INTEL', 'Gigabyte'],
        },
    },
];
