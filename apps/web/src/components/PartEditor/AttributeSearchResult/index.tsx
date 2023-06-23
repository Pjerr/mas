import { Attribute, useFindGroupQuery } from '@/store/api/endpoints';
import styles from './styles.module.css';
import React, { HTMLProps } from 'react';
import Groups from './Groups';

interface AttributeSearchResultProps {
    attributes: Attribute[];
    onClick: (attributes: Attribute[]) => void;
}
const AttributeSearchResult = React.forwardRef<
    HTMLDivElement,
    Omit<HTMLProps<HTMLDivElement>, 'onClick'> & AttributeSearchResultProps
>(({ attributes, onClick }, ref) => {
    const groupIds = attributes.map((attribute) => attribute.group.id);
    const { data: groupsResponse } = useFindGroupQuery(
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
        <div className={styles['search__container']} ref={ref}>
            <div className={styles['attribute-renderer__container']}>
                {groupsResponse &&
                    groupsResponse.data.map((group) => {
                        return (
                            <Groups
                                key={`rendered-group__${group.id}`}
                                group={group}
                                onClick={onClick}
                            />
                        );
                    })}
                {!groupsResponse && <>No attributes found!</>}
            </div>
        </div>
    );
});

export default AttributeSearchResult;
