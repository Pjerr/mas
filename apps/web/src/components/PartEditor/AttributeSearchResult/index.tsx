import { GroupDocument } from '@/store/api/endpoints';
import styles from './styles.module.css';
import React, { HTMLProps } from 'react';
import ResultGroups from './ResultGroups';
import { ResultGroupSkeleton } from './ResultGroupSkeleton';

interface AttributeSearchResultProps {
    groupDocuments: GroupDocument[];
    isLoading: boolean;
}
const AttributeSearchResult = React.forwardRef<
    HTMLDivElement,
    Omit<HTMLProps<HTMLDivElement>, 'onClick'> & AttributeSearchResultProps
>(({ groupDocuments, isLoading }, ref) => {
    return (
        <div className={styles['search__container']} ref={ref}>
            <div
                className={styles['attribute-renderer__container']}
                data-cy="product-editor__search-results"
            >
                {isLoading && <ResultGroupSkeleton />}
                {!isLoading &&
                    groupDocuments.length > 0 &&
                    groupDocuments.map((group) => {
                        return (
                            <ResultGroups
                                key={`rendered-group__${group.id}`}
                                group={group}
                            />
                        );
                    })}
                {!isLoading && !groupDocuments.length && (
                    <>No attributes found</>
                )}
            </div>
        </div>
    );
});

export default AttributeSearchResult;
