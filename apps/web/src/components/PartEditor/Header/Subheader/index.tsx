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
    activeForm: PartForm;
    setSearchParam: React.Dispatch<React.SetStateAction<string | null>>;
    setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Subheader({
    activeForm,
    setSearchParam,
    displaySearch,
    setDisplaySearch,
}: HeaderChipsProps) {
    const dispatch = useAppDispatch();
    const activeProduct = activeForm.state.defaultValues as Part;

    const groups: Record<string, Attribute[]> = useMemo(() => {
        if (!activeProduct.attributes.length) return {};
        return getAttributeGroups(activeProduct.attributes as Attribute[]);
    }, [activeForm, activeProduct, activeProduct.attributes]);

    const renderOptionChip: boolean = useMemo(() => {
        if (!activeProduct.attributes.length) return false;
        return activeProduct.attributes.some((attribute) => {
            if ((attribute as Attribute).editorType === 'options') return true;
        });
    }, [activeForm, activeProduct, activeProduct.attributes]);

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
                    data-cy="product-editor__search-button"
                />
            )}
            {displaySearch && (
                <div className={classNames(styles['search-input'])}>
                    <SearchInput
                        onChange={setSearchParam}
                        data-cy="product-editor__search-input"
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
