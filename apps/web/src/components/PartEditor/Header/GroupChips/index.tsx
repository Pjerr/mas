import Chips from '@/components/Chips';
import Chip from '@/components/Chips/Chip';
import { useAppDispatch } from '@/store';
import { Attribute } from '@/store/api/endpoints';
import { PartForm } from '@/store/editors/part/types';

import { useMemo } from 'react';
import { getAttributeGroups } from '../../utils';
import { removeFormFields } from '@/store/editors/part';
import { GroupChip } from './GroupChip';
interface HeaderChipsProps {
    activeForm: PartForm;
}
export function GroupChips({ activeForm }: HeaderChipsProps) {
    const dispatch = useAppDispatch();
    const activeProduct = activeForm.value;

    const groups: Record<string, Attribute[]> = useMemo(() => {
        if (!activeProduct.attributes.length) return {};
        return getAttributeGroups(activeProduct.attributes);
    }, [activeForm, activeProduct, activeProduct.attributes]);

    const renderOptionChip: boolean = useMemo(() => {
        if (!activeProduct.attributes.length) return false;
        return activeProduct.attributes.some((attribute) => {
            if (attribute.editorType === 'options') return true;
        });
    }, [activeForm, activeProduct, activeProduct.attributes]);

    const scrollToFormGroup = (groupIndex: number) => {
        const id = getGroupId(groupIndex);
        const element = document.getElementById(id);
        if (!element) return;
        element.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    };

    const getGroupId = (groupIndex: number) => {
        const groupIdMap: Record<number, string> = {
            0: 'group-common',
            [Object.keys(groups).length + 1]: 'group-options',
        };

        return groupIdMap[groupIndex] || `group-${groupIndex}`;
    };

    const removeAttributes = (attributes: Attribute[], groupId: string) => {
        dispatch(removeFormFields({ attributes }));
    };

    return (
        <Chips onSelect={scrollToFormGroup}>
            <Chip
                key={`Chip-CommonProperties`}
                title="Common properties"
                variant={'filled'}
            />
            {Object.entries(groups).map(([id, attributes], index) => (
                <GroupChip
                    key={`Chip-${index}-${id}`}
                    id={id}
                    index={index}
                    attributes={attributes}
                    removeAttributes={removeAttributes}
                    title={attributes[0].group.name}
                />
            ))}
            {renderOptionChip && (
                <Chip key={`Chip-Options`} title="Options" variant={'filled'} />
            )}
        </Chips>
    );
}
