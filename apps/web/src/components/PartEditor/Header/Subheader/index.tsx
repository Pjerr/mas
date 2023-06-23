import Button from '@/components/Button';
import Chips from '@/components/Chips';
import Chip from '@/components/Chips/Chip';
import { useAppDispatch } from '@/store';
import { Attribute, Part } from '@/store/api/endpoints';
import classNames from 'classnames';
import { useMemo } from 'react';
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import styles from '../styles.module.css';
import { PartForm } from '@/store/editors/part/types';
import { getAttributeGroups } from '../../utils';
import { removeFormFields } from '@/store/editors/part';
import SearchInput from '@/components/Inputs/SearchInput';
interface HeaderChipsProps {
    displaySearch: boolean;
    form: PartForm;
    setSearchParam: React.Dispatch<React.SetStateAction<string | null>>;
    setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Subheader({
    form,
    setSearchParam,
    displaySearch,
    setDisplaySearch,
}: HeaderChipsProps) {
    const dispatch = useAppDispatch();
    const part = form.state.defaultValues as Part;

    const groups: Record<string, Attribute[]> = useMemo(() => {
        if (!part.attributes.length) return {};
        return getAttributeGroups(part.attributes as Attribute[]);
    }, [form, part, part.attributes]);

    const renderOptionChip: boolean = useMemo(() => {
        if (!part.attributes.length) return false;
        return part.attributes.some((attribute) => {
            if ((attribute as Attribute).editorType === 'options') return true;
        });
    }, [form, part, part.attributes]);

    const scrollToFormGroup = (groupIndex: number) => {
        if (groupIndex === Object.keys(groups).length) {
            const element = document.getElementById('group-options');
            element?.scrollIntoView({ block: 'start', behavior: 'smooth' });
            return;
        }
        const element = document.getElementById(`group-${groupIndex}`);
        if (!element) throw new Error('No element with this id found');
        element.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    };

    const deleteFormGroup = (attributes: Attribute[], groupId: string) => {
        dispatch(removeFormFields({ attributes, groupId }));
    };

    return (
        <Chips onSelect={scrollToFormGroup}>
            {Object.entries(groups).map(([id, attributes], index) => (
                <Chip
                    key={`Chip-${index}-${id}`}
                    title={attributes[0].group.name ?? `Group-${index}`}
                    index={index}
                    variant={'filled'}
                    onDelete={() => deleteFormGroup(attributes, id)}
                    data-cy="subheader__chip"
                />
            ))}
            {renderOptionChip && (
                <Chip
                    key={`Chip-${Object.keys(groups).length + 1}-Options`}
                    index={Object.keys(groups).length}
                    title="Options"
                    variant={'filled'}
                    data-cy="chip__options"
                />
            )}
            {!displaySearch && (
                <Button
                    onClick={() => setDisplaySearch(true)}
                    icon={<FaPlusCircle />}
                    className={classNames(
                        styles['add-prop__button'],
                        styles['label']
                    )}
                />
            )}
            {displaySearch && (
                <div className={classNames(styles['search-input'])}>
                    <SearchInput
                        onChange={setSearchParam}
                        data-cy="part-editor__search-input"
                        tooltipText="Enter attribute name"
                    />
                    <Button
                        onClick={() => setDisplaySearch(false)}
                        icon={<FaTimesCircle />}
                        className={classNames(
                            styles['add-prop__button'],
                            styles['label']
                        )}
                    />
                </div>
            )}
        </Chips>
    );
}
