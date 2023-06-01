// import { Attribute, AttributeOption } from '@/store/api/endpoints';

// export function getOptionGroups(
//     attributes: Attribute[],
//     data: AttributeOption[]
// ): Record<string, AttributeOption[]> {
//     return data.reduce((options, option) => {
//         const attribute = attributes.find((a) => a.id === option.attribute);
//         if (attribute) {
//             const attributeName = attribute.displayName;
//             options[attributeName] ||= [];
//             options[attributeName].push(option);
//         }
//         return options;
//     }, {} as Record<string, AttributeOption[]>);
// }
