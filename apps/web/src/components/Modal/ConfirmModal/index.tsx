import Button from '@/components/Button';
import Modal from '@/components/Modal';
import React, { ReactElement, useState } from 'react';
import styles from './styles.module.css';
import { FaCheck } from 'react-icons/fa';

interface ConfirmModalProps {
    modalTitle: string;
    text?: string;
    control: ReactElement;
    onConfirm: () => void;
}

export default function ConfirmModal({
    modalTitle,
    text,
    control,
    onConfirm,
}: ConfirmModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = () => {
        setIsOpen(false);
        onConfirm();
    };

    return (
        <Modal
            isOpen={isOpen}
            setOpen={setIsOpen}
            title={modalTitle}
            control={control}
        >
            <div className={styles['modal__container']}>
                {text}
                <div className={styles['confirm__button']}>
                    <Button
                        icon={<FaCheck />}
                        onClick={handleConfirm}
                        variant={'primary'}
                        type="button"
                    >
                        OK
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
