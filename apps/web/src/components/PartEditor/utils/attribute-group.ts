import { Attribute } from '@/store/api/endpoints';

export function getAttributeGroups(attributes: Attribute[]) {
    return attributes.reduce(
        (groups: Record<string, Attribute[]>, attribute: Attribute) => {
            if (attribute.editorType === 'options') return groups;
            const groupId = attribute.group.id;
            groups[groupId] = groups[groupId] || [];
            groups[groupId].push(attribute);
            return groups;
        },
        {}
    );
}
