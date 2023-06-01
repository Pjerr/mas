import Table from '@/components/Table';
import { optionColumnDef } from '@/components/Table/ColumnDef';
import { TableProvider } from '@/components/Table/TableProvider';
import { useTable } from '@/hooks/useTable';
import { EntityType } from '@/store/table/types';
import { instanceIds } from '@/types/entity';
import { useEffect } from 'react';

interface OptionTableProps {
    attributeId: string;
}

export default function OptionsTable({ attributeId }: OptionTableProps) {
    const { loadTableData } = useTable(instanceIds[EntityType.Option]);

    useEffect(() => {
        loadTableData(EntityType.Option, attributeId);
    }, [attributeId]);

    const refetch = () => {
        loadTableData(EntityType.Option, attributeId);
    };

    return (
        <TableProvider key={`option-grid__${attributeId}`}>
            <Table
                placeholder={`Option table is empty`}
                view={optionColumnDef as any}
                instanceId={instanceIds[EntityType.Option]}
                refetch={refetch}
                paginate={true}
            ></Table>
        </TableProvider>
    );
}
