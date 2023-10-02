import { NextPageWithLayout } from '@/pages/_app';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { useTable } from '@/hooks/useTable';
import { instanceIds } from '@/types/entity';
import { EntityType } from '@/store/table/types';
import { resetForm } from '@/store/editors/part';
import { TableProvider } from '@/components/Table/TableProvider';
import Table from '@/components/Table';
import { partColumnDef } from '@/components/Table/ColumnDef';
import { createPartForm } from '@/store/editors/part/thunks';
import { useCreateDraftPartMutation } from '@/store/api/endpoints';
import Toolbar from '@/components/Toolbar';
import { Row } from '@tanstack/react-table';
import { ContextMenuType } from '@/components/ContextMenu/types';
import styles from './styles.module.css';

const Parts: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { loadTableData } = useTable();

    const [createDraft] = useCreateDraftPartMutation();

    const refetch = () => {
        loadTableData(EntityType.Part);
    };

    useEffect(() => {
        loadTableData(EntityType.Part);
    }, []);

    const onCreate = async () => {
        dispatch(resetForm());

        const { data: part } = await createDraft({
            createDraft: {
                name: 'Untitled part',
            },
        }).unwrap();

        dispatch(
            createPartForm({
                part,
            })
        );
        router.push('/create');
    };

    const onEdit = (partIds: string[] | undefined) => {
        if (!partIds) return;
        router.push(`${partIds[0]}`);
    };

    const onEditMode = (selected: string[] | undefined): boolean => {
        return selected && selected.length === 1 ? false : true;
    };

    const onRowDoubleClick = (row: Row<any>) => {
        const partIds: string[] = [row.getAllCells()[0].getValue() as string];
        onEdit(partIds);
    };

    return (
        <div className={styles['products__container']}>
            <TableProvider>
                <Toolbar
                    type={EntityType.Part}
                    onCreate={onCreate}
                    onEdit={onEdit}
                    onEditMode={onEditMode}
                />
                <Table
                    placeholder={`Part configuration table is empty`}
                    view={partColumnDef}
                    instanceId={instanceIds[EntityType.Part]}
                    refetch={refetch}
                    showPagination={true}
                    onRowDoubleClick={onRowDoubleClick}
                    contextMenuType={ContextMenuType.Part}
                ></Table>
            </TableProvider>
        </div>
    );
};

Parts.getLayout = SidebarLayout;

export default Parts;
