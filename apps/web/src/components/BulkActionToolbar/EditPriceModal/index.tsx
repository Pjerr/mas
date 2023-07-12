import { FaCheck, FaMoneyBillWave } from 'react-icons/fa';
import Button from '../../Button';
import Modal, { ModalSize } from '../../Modal';
import styles from '../styles.module.css';
import { EntityType } from '@/store/table/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectSelectedEntities } from '@/store/table';
import { instanceIds } from '@/types/entity';
import { Part } from '@/store/api/endpoints';
import { BulkPriceForm } from './BulkPriceForm';
import { useState } from 'react';

interface EditPriceModalProps {
    type: EntityType;
    selectedIds: string[] | undefined;
    onBulkPriceEdit: (selectedIds: string[], payloads: number[]) => void;
}

export function EditPriceModal({
    selectedIds,
    onBulkPriceEdit,
}: EditPriceModalProps) {
    const parts = useSelector((state: RootState) =>
        selectSelectedEntities(state, instanceIds[EntityType.Part], selectedIds)
    ) as Part[];

    const [modalOpen, setIsModalOpen] = useState(false);

    return (
        <Modal
            isOpen={modalOpen}
            setOpen={setIsModalOpen}
            control={
                <Button
                    icon={
                        <FaMoneyBillWave className={styles['toolbar-icon']} />
                    }
                    variant={'borderless'}
                    tooltipText={`Edit base price`}
                    disabled={!selectedIds}
                    onClick={() => setIsModalOpen(true)}
                />
            }
            title="Edit base price"
            size={ModalSize.XL}
        >
            <>
                {parts && parts.length > 0 && (
                    <div className={styles['bulk-edit__content']}>
                        <BulkPriceForm
                            parts={parts}
                            onBulkPriceEdit={onBulkPriceEdit}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </div>
                )}
            </>
        </Modal>
    );
}
