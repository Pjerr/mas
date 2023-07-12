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
import { EditPriceModal } from './EditPriceModal';

interface BulkActionToolbarProps {
    type: EntityType;
    onBulkPriceEdit: (selectedIds: string[], payloads: number[]) => void;
}

export default function BulkActionToolbar({
    type,
    onBulkPriceEdit,
}: BulkActionToolbarProps) {
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
                <EditPriceModal
                    type={type}
                    selectedIds={selectedIds}
                    onBulkPriceEdit={onBulkPriceEdit}
                />
            </div>
        </div>
    );
}
