import Chips from '@/components/Chips';
import Chip from '@/components/Chips/Chip';
import { useAppDispatch } from '@/store';
import { Attribute, Part } from '@/store/api/endpoints';
import { PartForm } from '@/store/editors/part/types';

import { useMemo } from 'react';
import { getAttributeGroups } from '../../utils';
import { removeFormFields } from '@/store/editors/part';
interface HeaderChipsProps {
    activeForm: PartForm;
}
export function GroupChips({ activeForm }: HeaderChipsProps) {
    const dispatch = useAppDispatch();
    const activePart = activeForm.state.defaultValues as Part;

    const groups: Record<string, Attribute[]> = useMemo(() => {
        if (!activePart || !activePart.attributes.length) return {};
        return getAttributeGroups(activePart.attributes as Attribute[]);
    }, [activeForm, activePart, activePart.attributes]);

    const renderOptionChip: boolean = useMemo(() => {
        if (!activePart.attributes.length) return false;
        return activePart.attributes.some((attribute) => {
            if ((attribute as Attribute).editorType === 'options') return true;
        });
    }, [activeForm, activePart, activePart.attributes]);

    const scrollToFormGroup = (groupIndex: number) => {
        const id = getGroupId(groupIndex);
        const element = document.getElementById(id);
        if (!element) throw new Error('No element with this id found');
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

    const deleteFormGroup = (attributes: Attribute[], groupId: string) => {
        dispatch(removeFormFields({ attributes, groupId }));
    };

    return (
        <Chips onSelect={scrollToFormGroup}>
            <Chip
                key={`Chip-CommonProperties`}
                title="Common properties"
                variant={'filled'}
                data-cy="chip__common"
            />
            {Object.entries(groups).map(([id, attributes], index) => (
                <Chip
                    key={`Chip-${index}-${id}`}
                    title={attributes[0].group.name ?? `Group-${index}`}
                    variant={'filled'}
                    onDelete={() => deleteFormGroup(attributes, id)}
                    data-cy="subheader__chip"
                />
            ))}
            {renderOptionChip && (
                <Chip
                    key={`Chip-Options`}
                    title="Options"
                    variant={'filled'}
                    data-cy="chip__options"
                />
            )}
        </Chips>
    );
}
