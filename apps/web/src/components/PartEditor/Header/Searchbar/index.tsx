import { useFindAttributeQuery } from '@/store/api/endpoints';
import classNames from 'classnames';
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import styles from './styles.module.css';
import React, { HTMLProps } from 'react';
import { PartForm } from '@/store/editors/part/types';
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
                        key={`attribute-renderer__${activeForm.value.id}`}
                        attributes={responseAttributes.data}
                    />
                )}
            </div>
        );
    }
);

export default Searchbar;
