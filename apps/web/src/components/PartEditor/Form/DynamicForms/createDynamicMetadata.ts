import { PropertyMetadata } from '@/lib/metadata';
import { Attribute } from '@/store/api/endpoints';
import { EditorType, EditorValidation } from 'shared';

export function createDynamicMetadata(attribute: Attribute) {
    const metadata: PropertyMetadata = {
        displayName: attribute.displayName,
        propertyKey: `properties.${attribute.propertyKey}`,
        isArray: false,
        propertyType: attribute.editorType as EditorType,
        propertyValidation: attribute.editorValidation as EditorValidation,
        // additionalMetadata: {
        //     selectOptions: attribute.additionalMetadata?.selectOptions,
        // },
    };
    return metadata;
}
