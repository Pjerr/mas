import { Attribute, useFindGroupQuery } from '@/store/api/endpoints';
import styles from './styles.module.css';
import React from 'react';
import Groups from './Groups';

interface AttributeSearchResultProps {
    data: Attribute[];
    onClick: (attributes: Attribute[]) => void;
}

export default function AttributeSearchResult({
    data,
    onClick,
}: AttributeSearchResultProps) {
    const groupIds = data.map((attribute) => attribute.group.id);
    const {
        data: groupsResponse,
        isError,
        isFetching,
        isLoading,
    } = useFindGroupQuery(
        {
            query: {
                sort: { field: 'id', order: 'ASC' },
                include: ['attributes', 'attributes.group'],
                filters: [
                    {
                        field: 'id',
                        operator: '$in',
                        value: groupIds,
                    },
                ],
            },
        },
        { skip: !groupIds.length }
    );

    return (
        <React.Fragment>
            {groupsResponse && (
                <div
                    className={styles['attribute-renderer__container']}
                    data-cy="product-editor__search-results"
                >
                    {groupsResponse.data.map((group) => {
                        return (
                            <Groups
                                key={`rendered-group__${group.id}`}
                                group={group}
                                onClick={onClick}
                            />
                        );
                    })}
                </div>
            )}
        </React.Fragment>
    );
}
