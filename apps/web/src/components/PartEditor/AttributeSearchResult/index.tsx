import { Attribute, useFindGroupQuery } from '@/store/api/endpoints';
import styles from './styles.module.css';
import React, { HTMLProps } from 'react';
import Groups from './Groups';

interface AttributeSearchResultProps {
    attributes: Attribute[];
}
const AttributeSearchResult = React.forwardRef<
    HTMLDivElement,
    HTMLProps<HTMLDivElement> & AttributeSearchResultProps
>(({ attributes }, ref) => {
    const groupIds = attributes.map((attribute) => attribute.group.id);
    const { data: groupsResponse } = useFindGroupQuery(
        {
            query: {
                sort: { field: 'id', order: 'ASC' },
                include: ['attributes.group'],
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
        <div className={styles['search__container']} ref={ref}>
            <div className={styles['attribute-renderer__container']}>
                {groupsResponse &&
                    groupsResponse.data.map((group) => {
                        return (
                            <Groups
                                key={`rendered-group__${group.id}`}
                                group={group}
                            />
                        );
                    })}
                {!groupsResponse && <>No attributes found!</>}
            </div>
        </div>
    );
});

export default AttributeSearchResult;
