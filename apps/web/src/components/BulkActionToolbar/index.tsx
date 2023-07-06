import { useTableSelector } from '@/hooks/useTable';
import { RootState } from '@/store';
import {
    selectIsLoading,
    selectSelectedRows,
    selectTableData,
} from '@/store/table';
import { EntityType } from '@/store/table/types';
import { instanceIds } from '@/types/entity';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import Button from '../Button';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { TbAdjustmentsAlt } from 'react-icons/tb';
import { EditPriceModal } from './EditPriceModal';

interface BulkActionToolbarProps {
    type: EntityType;
}

export default function BulkActionToolbar({ type }: BulkActionToolbarProps) {
    const table = useTableSelector(instanceIds[type]);

    const tableData = useSelector((state: RootState) =>
        selectTableData(state, instanceIds[type])
    );

    const isLoading = useSelector((state: RootState) =>
        selectIsLoading(state, instanceIds[type])
    );

    const selectedIds = useSelector((state: RootState) =>
        selectSelectedRows(state, instanceIds[type])
    );

    while (isLoading) return <>Spinner will go here!</>;

    if (!table || !tableData) return <></>;

    return (
        <div className={styles['toolbar']}>
            <div className={styles['action-icons']}>
                <EditPriceModal type={type} selectedIds={selectedIds} />
                <Button
                    icon={
                        <AiOutlineShoppingCart
                            className={styles['toolbar-icon']}
                        />
                    }
                    variant={'borderless'}
                    disabled={!selectedIds}
                    tooltipText={`Edit status`}
                />
                <Button
                    icon={
                        <TbAdjustmentsAlt className={styles['toolbar-icon']} />
                    }
                    variant={'borderless'}
                    disabled={!selectedIds}
                    tooltipText={`Edit manufacturer`}
                />
            </div>
        </div>
    );
}
