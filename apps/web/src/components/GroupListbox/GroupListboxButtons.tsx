import { FaEdit, FaTimes } from 'react-icons/fa';
import Button from '../Button';
import styles from './styles.module.css';
import ConfirmModal from '@/components/Modal/ConfirmModal';

interface GroupListboxButtonsProps {
    itemIndex: number;

    onToggleEditMode: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    onDelete: (index: number) => void;
}

export default function GroupListboxButtons({
    itemIndex,
    onToggleEditMode,
    onDelete,
}: GroupListboxButtonsProps) {
    return (
        <div className={styles['button__container']}>
            <Button icon={<FaEdit />} onClick={onToggleEditMode} />
            <ConfirmModal
                control={<Button icon={<FaTimes />} />}
                onConfirm={() => onDelete(itemIndex)}
                modalTitle={'Remove group'}
                text={
                    'Are you sure? This action will remove all attributes in this group.'
                }
            />
        </div>
    );
}
