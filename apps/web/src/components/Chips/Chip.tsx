import classNames from 'classnames';
import React, { HTMLProps, useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from '../Button';
import styles from './styles.module.css';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { ChipsContext } from './Provider';

export interface ChipProps {
    title: string;
    onDelete?: () => void;
    variant: 'filled' | 'outlined';
    index?: number;
}

const Chip = React.forwardRef<
    HTMLDivElement,
    Omit<HTMLProps<HTMLDivElement>, 'onClick'> & ChipProps
>(({ title, variant, index, onDelete, ...rest }, ref) => {
    const { onSelect } = useContext(ChipsContext);

    const handleDelete = () => {
        if (!onDelete) return;
        onDelete();
    };

    const handleChipSelect = () => {
        if (!index) return;
        if (index < 0)
            throw new Error('Chips index is not defined (Chip component)');
        onSelect(index);
    };

    return (
        <div
            className={classNames(styles['chip__container'], [
                styles[`chip__${variant}`],
            ])}
            ref={ref}
            {...rest}
            onClick={handleChipSelect}
        >
            <div className={styles['chip__title']}>{title}</div>
            {onDelete && (
                <ConfirmModal
                    control={
                        <Button
                            icon={<FaTimes />}
                            className={classNames(styles['chip__delete'])}
                            data-cy="chip__delete-button"
                        />
                    }
                    modalTitle="Remove attributes"
                    text="Are you sure? This action will remove all attributes in this group."
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
});

export default Chip;
