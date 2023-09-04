import { Attribute, GroupDocument } from '@/store/api/endpoints';
import styles from './styles.module.css';
import { useFindAttributeQuery } from '@/store';
import { toast } from 'react-toastify';
import { usePartEditor } from '@/hooks/usePartEditor';
import { ResultAttributeSkeleton } from './ResultAttributesSkeleton';
import { ResultAtributes } from './ResultAttributes';

export default function ResultGroups({ group }: { group: GroupDocument }) {
    const { addProperty } = usePartEditor();

    const { data: attributes, isLoading } = useFindAttributeQuery(
        {
            query: {
                filters: [
                    {
                        field: 'id',
                        operator: '$in',
                        value: group.attributes?.map((a) => a.id) ?? {},
                    },
                ],
            },
        },
        { skip: !group.attributes || !group.attributes.length }
    );

    const handleAddGroup = () => {
        if (!attributes || !attributes.data.length) {
            toast('This group does not have any attributes', { type: 'info' });
            return;
        }
        addProperty(attributes.data);
    };

    return (
        <div className={styles['attribute-renderer__groups']}>
            <div className={styles['groups__name']} onClick={handleAddGroup}>
                {group.name}
            </div>
            <div
                className={styles['attribute-renderer__group']}
                key={`attribute-renderer-${group.id}`}
            >
                {isLoading && <ResultAttributeSkeleton />}
                {!isLoading &&
                    attributes &&
                    attributes.data.map((attribute: Attribute) => (
                        <ResultAtributes
                            key={`result-attribute-${attribute.id}`}
                            attribute={attribute}
                        />
                    ))}
                {!isLoading && !attributes && (
                    <span className={styles['group__info-message']}>
                        No attributes found
                    </span>
                )}
            </div>
        </div>
    );
}
