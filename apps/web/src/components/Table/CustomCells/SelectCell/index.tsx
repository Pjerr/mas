import { Row } from '@tanstack/react-table';
import styles from './styles.module.css';
import Checkbox from '@/components/Inputs/Checkbox';

interface CellProps {
    row: Row<any>;
}

export function SelectCell({ row }: CellProps) {
    return (
        <div className={styles['controls-column']}>
            <Checkbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        </div>
    );
}
