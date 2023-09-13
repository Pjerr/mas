import { FaTimes, FaCheck } from 'react-icons/fa';
import styles from './styles.module.css';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import Button from '@/components/Button';

interface FormButtonsProps {
    handleCancel: () => void;
}

export default function FormButtons({ handleCancel }: FormButtonsProps) {
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
            <Button type={'submit'} icon={<FaCheck />} variant={'primary'}>
                Save
            </Button>
        </div>
    );
}
