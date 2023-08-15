import Button from '@/components/Button';
import Chip from '@/components/Chips/Chip';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { Attribute } from '@/store/api/endpoints';
import { FaTimes } from 'react-icons/fa';
import styles from './styles.module.css';

interface GroupChipProps {
    index: number;
    id: string;
    title: string;
    attributes: Attribute[];
    removeAttributes: (attributes: Attribute[], id: string) => void;
}
export function GroupChip({
    index,
    title,
    removeAttributes,
    id,
    attributes,
}: GroupChipProps) {
    return (
        <Chip
            key={`Chip-${index}-${id}`}
            title={title}
            variant={'filled'}
            isExpandable={true}
            rightChip={
                <ConfirmModal
                    control={
                        <Button
                            icon={<FaTimes />}
                            data-cy="chip__delete-button"
                        />
                    }
                    modalTitle="Remove attributes?"
                    text="This action will remove all attributes in this group."
                    onConfirm={() => removeAttributes(attributes, id)}
                />
            }
            data-cy="subheader__chip"
        >
            <div className={styles['chip__content']}>
                {attributes.map((attribute, index) => (
                    <div
                        className={styles['chip__attribute']}
                        key={`attribute-${id}-${index}`}
                    >
                        {attribute.displayName}
                        <Button
                            icon={<FaTimes />}
                            onClick={() => removeAttributes([attribute], id)}
                            variant={'borderless'}
                        />
                    </div>
                ))}
            </div>
        </Chip>
    );
}
