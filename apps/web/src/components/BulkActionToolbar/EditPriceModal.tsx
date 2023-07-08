import { FaCheck, FaMoneyBillWave } from 'react-icons/fa';
import Button from '../Button';
import Modal from '../Modal';
import styles from './styles.module.css';
import { EntityType } from '@/store/table/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectSelectedEntities } from '@/store/table';
import { instanceIds } from '@/types/entity';
import { Part } from '@/store/api/endpoints';

interface EditPriceModalProps {
    type: EntityType;
    selectedIds: string[] | undefined;
    onUpdate: (
        selectedIds: string[],
        prop: 'price' | 'status' | 'manufacturer'
    ) => void;
}

export function EditPriceModal({
    selectedIds,
    type,
    onUpdate,
}: EditPriceModalProps) {
    const parts = useSelector((state: RootState) =>
        selectSelectedEntities(state, instanceIds[EntityType.Part], selectedIds)
    ) as Part[];

    const handleEditPrice = () => {
        if (!parts || parts.length === 0) return;
        onUpdate(
            parts.map((part) => part.id),
            'price'
        );
    };

    return (
        <Modal
            control={
                <Button
                    icon={
                        <FaMoneyBillWave className={styles['toolbar-icon']} />
                    }
                    variant={'borderless'}
                    tooltipText={`Edit base price`}
                    disabled={!selectedIds}
                />
            }
            title="Edit base price"
        >
            <div className={styles['bulk-edit__containter']}>
                {parts && parts.length > 0 && (
                    <div className={styles['bulk-edit__content']}>
                        {parts.map((part) => part.name)}
                    </div>
                )}
                <Button
                    variant={'primary'}
                    icon={<FaCheck />}
                    onClick={handleEditPrice}
                >
                    Save
                </Button>
            </div>
        </Modal>
    );
}
