import { FaTimes, FaCheck } from 'react-icons/fa';
import styles from './styles.module.css';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import Button from '@/components/Button';

interface FormButtonsProps {
    handleCancel: () => void;
    generateDisabled: boolean;
}

export default function FormButtons({
    handleCancel,
    generateDisabled,
}: FormButtonsProps) {
    return (
        <div className={styles['form__buttons']}>
            <ConfirmModal
                onConfirm={handleCancel}
                modalTitle={'Reset form?'}
                control={
                    <Button
                        icon={<FaTimes />}
                        variant={'secondary'}
                        type="button"
                    >
                        Cancel
                    </Button>
                }
            />
            <Button
                type={'submit'}
                icon={<FaCheck />}
                variant={'primary'}
                disabled={generateDisabled}
            >
                Save
            </Button>
        </div>
    );
}
