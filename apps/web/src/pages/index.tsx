import { NextPageWithLayout } from '@/pages/_app';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import { useTable, useTableSelector } from '@/hooks/useTable';
import { instanceIds } from '@/types/entity';
import { EntityType } from '@/store/table/types';
import { resetForm } from '@/store/editors/part';
import { TableProvider } from '@/components/Table/TableProvider';
import Table from '@/components/Table';
import { partColumnDef } from '@/components/Table/ColumnDef';
import PartTableHeader from '@/components/PartTableHeader';
import { createPartForm } from '@/store/editors/part/thunks';
import { useSelector } from 'react-redux';
import { selectSelectedRows } from '@/store/table';
import { useMultipleUpdatePartMutation } from '@/store/api/endpoints';

const Parts: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { loadTableData } = useTable();

    const [multipleUpdatePart] = useMultipleUpdatePartMutation();

    const refetch = () => {
        loadTableData(EntityType.Part);
    };

    useEffect(() => {
        loadTableData(EntityType.Part);
    }, []);

    const onCreate = () => {
        dispatch(resetForm());
        dispatch(
            createPartForm({
                part: {
                    name: 'Untitled part',
                    attributes: [],
                    properties: {},
                },
            })
        );
        router.push('/create');
    };

    const selectedIds = useSelector((state: RootState) =>
        selectSelectedRows(state, instanceIds['Part'])
    );

    const onEdit = (productIds: string[] | undefined) => {
        if (!productIds) return;
        router.push(`${productIds[0]}`);
    };

    const onEditMode = (selected: string[] | undefined): boolean => {
        return selected && selected.length === 1 ? false : true;
    };

    const onBulkUpdate = (
        selectedIds: string[],
        type: 'price' | 'status' | 'manufacturer'
    ) => {
        console.log(selectedIds, type);
    };

    return (
        <>
            <TableProvider>
                <PartTableHeader
                    toolbarProps={{
                        onCreate,
                        onEdit,
                        onEditMode,
                    }}
                    bulkActionProps={{
                        selectedIds,
                        type: EntityType.Part,
                        onUpdate: onBulkUpdate,
                    }}
                />
                <Table
                    placeholder={`Part table is empty`}
                    view={partColumnDef}
                    instanceId={instanceIds[EntityType.Part]}
                    refetch={refetch}
                    showPagination={true}
                ></Table>
            </TableProvider>
        </>
    );
};

Parts.getLayout = SidebarLayout;

export default Parts;
