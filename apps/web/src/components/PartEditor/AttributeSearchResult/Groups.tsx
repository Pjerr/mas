import { Attribute, Group } from '@/store/api/endpoints';
import styles from './styles.module.css';
import { usePartEditor } from '@/hooks/usePartEditor';

interface AddAttributesProps {
    type: 'group' | 'attribute';
    attribute?: Attribute;
    group?: Group;
}

export default function Groups({ group }: { group: Group }) {
    const { addProperty } = usePartEditor();

    const handleOnClick = (addAttributesProps: AddAttributesProps) => {
        const { type, attribute, group } = addAttributesProps;
        if (type === 'group' && group) {
            addProperty(group.attributes);
        }
        if (type === 'attribute' && attribute) {
            addProperty([attribute]);
        }
    };

    return (
        <div
            className={styles['attribute-renderer__groups']}
            key={`attribute-renderer-${group.id}`}
        >
            <div
                className={styles['groups__name']}
                onClick={() => handleOnClick({ type: 'group', group })}
            >
                {group.name}
            </div>
            <div className={styles['groups__attributes']}>
                {group.attributes.map((attribute) => (
                    <div
                        key={`attributes__attribute-${attribute.id}`}
                        className={styles['attributes__attribute']}
                        onClick={() =>
                            handleOnClick({
                                type: 'attribute',
                                attribute,
                            })
                        }
                    >
                        {attribute.displayName}
                    </div>
                ))}
            </div>
        </div>
    );
}
