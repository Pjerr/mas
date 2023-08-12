import { useTable, useTableSelector } from '@/hooks/useTable';
import { RootState } from '@/store';
import {
    selectIsLoading,
    selectSelectedRows,
    selectTableData,
} from '@/store/table';
import { EntityType } from '@/store/table/types';
import { instanceIds } from '@/types/entity';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import Button from '../Button';
import { CgAdd } from 'react-icons/cg';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import ConfirmModal from '../Modal/ConfirmModal';
import SearchInput from '../Inputs/SearchInput';

interface ToolbarProps {
    type: EntityType;
    onEdit: (selectedIds: string[] | undefined) => void;
    onEditMode: (selectedIds: string[] | undefined) => boolean;
    onCreate: () => void;
}

export default function Toolbar({
    type,
    onCreate,
    onEdit,
    onEditMode,
}: ToolbarProps) {
    const [searchParam, setSearchParam] = useState('');
    const table = useTableSelector(instanceIds[type]);
    const { removeMany } = useTable(instanceIds[type]);

    const tableData = useSelector((state: RootState) =>
        selectTableData(state, instanceIds[type])
    );

    const isLoading = useSelector((state: RootState) =>
        selectIsLoading(state, instanceIds[type])
    );

    const selectedIds = useSelector(
        (state: RootState) =>
            selectSelectedRows(state, instanceIds[type]) as string[]
    );

    while (isLoading) return <>Spinner will go here!</>;

    if (!table || !tableData) return <></>;

    const onRemove = () => {
        if (selectedIds) removeMany(selectedIds, type);
        table.resetRowSelection();
    };

    const onSearch = () => {
        //TODO: search
    };

    return (
        <div className={styles['toolbar']}>
            <div className={styles['action-icons']}>
                <Button
                    icon={<CgAdd className={styles['toolbar-icon']} />}
                    variant={'borderless'}
                    onClick={onCreate}
                    disabled={!tableData}
                    tooltipText={`New ${type}`}
                />
                <Button
                    icon={<FaEdit className={styles['toolbar-icon']} />}
                    variant={'borderless'}
                    onClick={() => onEdit(selectedIds)}
                    disabled={onEditMode(selectedIds)}
                    tooltipText={`Edit ${type}`}
                />
                <ConfirmModal
                    control={
                        <Button
                            icon={
                                <AiOutlineDelete
                                    className={styles['toolbar-icon']}
                                />
                            }
                            variant={'borderless'}
                            disabled={!selectedIds?.length}
                        />
                    }
                    modalTitle={`Delete ${type}/s`}
                    text={'Are you sure? This action cannot be undone.'}
                    onConfirm={onRemove}
                />
            </div>
            <SearchInput
                placeholder="Search"
                value={searchParam}
                onChange={setSearchParam}
                onClick={onSearch}
            />
        </div>
    );
}
