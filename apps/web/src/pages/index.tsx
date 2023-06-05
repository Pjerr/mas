import { NextPageWithLayout } from '@/pages/_app';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { useRouter } from 'next/router';
import qs from 'qs';
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

const Parts: NextPageWithLayout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { loadTableData } = useTable(instanceIds[EntityType.Part]);

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
        router.push('/edit');
    };

    const onEdit = (productIds: string[] | undefined) => {
        if (!productIds) return;
        router.push(`/edit?${qs.stringify(productIds[0])}`);
    };

    const onEditMode = (selected: string[] | undefined): boolean => {
        return selected && selected.length > 1 ? false : true;
    };

    return (
        <TableProvider>
            <PartTableHeader
                toolbarProps={{
                    onCreate,
                    onEdit,
                    onEditMode,
                }}
                bulkActionProps={{
                    name: 'bulkActionTestName',
                }}
            />
            <Table
                placeholder={`Part table is empty`}
                view={partColumnDef}
                instanceId={instanceIds[EntityType.Part]}
                refetch={refetch}
                paginate={true}
            ></Table>
        </TableProvider>
    );
};

Parts.getLayout = SidebarLayout;

export default Parts;
