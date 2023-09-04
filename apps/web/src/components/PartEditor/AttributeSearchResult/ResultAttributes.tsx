import { Attribute } from '@/store/api/endpoints';
import styles from './styles.module.css';
import { usePartEditor } from '@/hooks/usePartEditor';

export interface AttributesProps {
    attribute: Attribute;
}

export function ResultAtributes({ attribute }: AttributesProps) {
    const { addProperty } = usePartEditor();
    const handleAddAttribute = () => {
        addProperty([attribute]);
    };

    return (
        <div
            key={`attributes__attribute-${attribute.id}`}
            className={styles['attributes__attribute']}
            onClick={handleAddAttribute}
            data-cy="search-results__attribute"
        >
            {attribute.displayName}
        </div>
    );
}
