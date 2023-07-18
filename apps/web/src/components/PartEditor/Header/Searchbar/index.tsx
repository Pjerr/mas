import { useAppDispatch } from '@/store';
import { Attribute, Part, useFindAttributeQuery } from '@/store/api/endpoints';
import classNames from 'classnames';
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from './styles.module.css';
import React, { HTMLProps } from 'react';
import { PartForm } from '@/store/editors/part/types';
import { addFormFields } from '@/store/editors/part';
import Button from '@/components/Button';
import SearchInput from '@/components/Inputs/SearchInput';
import AttributeSearchResult from '../../AttributeSearchResult';

interface HeaderSearchbarProps {
    activeForm: PartForm;
    searchParam: string | null;
    displaySearch: boolean;
    setSearchParam: React.Dispatch<React.SetStateAction<string | null>>;
    setDisplaySearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const Searchbar = React.forwardRef<
    HTMLDivElement,
    HTMLProps<HTMLDivElement> & HeaderSearchbarProps
>(
    (
        {
            activeForm,
            searchParam,
            displaySearch,
            setDisplaySearch,
            setSearchParam,
            ...props
        },
        ref
    ) => {
        const dispatch = useAppDispatch();

        const addProperty = (attributes: Attribute[]) => {
            if (!attributes.length)
                throw new Error('No attributes selected for adding');

            if (!(activeForm.state.defaultValues as Part).attributes.length) {
                dispatch(addFormFields({ attributes }));
                return;
            }

            const attributesToAdd = attributes.filter(
                (attribute) =>
                    !(activeForm.state.defaultValues as Part).attributes.some(
                        (attributeForAdd) => attributeForAdd.id === attribute.id
                    )
            );
            if (!attributesToAdd || !attributesToAdd.length) {
                toast('This attribute is already added to part', {
                    type: 'warning',
                });
                return;
            }

            dispatch(addFormFields({ attributes: attributesToAdd }));
        };

        const { data: responseAttributes } = useFindAttributeQuery(
            {
                query: {
                    sort: { field: 'createdAt', order: 'ASC' },
                    filters: [
                        {
                            field: 'searchIndex',
                            operator: '$fulltext',
                            value: [`%${searchParam}%`],
                        },
                    ],
                },
            },
            { skip: !searchParam }
        );

        return (
            <div className={styles['search__container']} ref={ref} {...props}>
                {!displaySearch && (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setDisplaySearch(true);
                        }}
                        icon={<FaPlusCircle />}
                        className={classNames(
                            styles['label'],
                            styles['toggle__button']
                        )}
                    />
                )}
                {displaySearch && (
                    <div className={classNames(styles['search-input'])}>
                        <SearchInput
                            onChange={setSearchParam}
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
                {responseAttributes && displaySearch && (
                    <AttributeSearchResult
                        key={`attribute-renderer__${
                            (activeForm.state.defaultValues as Part).id
                        }`}
                        onClick={addProperty}
                        attributes={responseAttributes.data}
                    />
                )}
            </div>
        );
    }
);

export default Searchbar;
