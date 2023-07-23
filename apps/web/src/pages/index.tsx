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
import PartTableHeader from '@/components/PartTableHeader';
import { createPartForm } from '@/store/editors/part/thunks';
import { useSelector } from 'react-redux';
import { selectSelectedRows } from '@/store/table';
import {
    useBulkUpdatePricePartMutation,
    useCreateDraftPartMutation,
} from '@/store/api/endpoints';
import { toast } from 'react-toastify';

const Parts: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { loadTableData } = useTable();

    const [createDraft] = useCreateDraftPartMutation();
    const [bulkUpdatePrice] = useBulkUpdatePricePartMutation();

    const refetch = () => {
        loadTableData(EntityType.Part);
    };

    useEffect(() => {
        loadTableData(EntityType.Part);
    }, []);

    const onCreate = async () => {
        dispatch(resetForm());

        const { data: part } = await createDraft().unwrap();

        dispatch(
            createPartForm({
                part,
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

    const onBulkPriceEdit = async (
        selectedIds: string[],
        payloads: number[]
    ) => {
        const response = await bulkUpdatePrice({
            ids: selectedIds,
            bulkUpdatePrice: {
                payloads,
            },
        });
        if ('error' in response) {
            toast('Error on bulk update', { type: 'error' });
            return;
        }

        toast('Prices updated', { type: 'success' });
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
                        onBulkPriceEdit,
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
