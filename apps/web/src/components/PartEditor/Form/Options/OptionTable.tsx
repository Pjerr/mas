import Table from '@/components/Table';
import { partOptionColumnDef } from '@/components/Table/ColumnDef';
import { TableProvider } from '@/components/Table/TableProvider';
import { selectActivePartId } from '@/store/editors/part';
import { useSelector } from 'react-redux';

interface OptionTableProps {
    attributeId: string;
}

export default function OptionsTable({ attributeId }: OptionTableProps) {
    const partId = useSelector(selectActivePartId);

    return (
        <TableProvider key={`option-grid__${attributeId}`}>
            <Table
                placeholder={`No options found`}
                view={partOptionColumnDef}
                refetch={() => {}}
                instanceId={`${partId}-${attributeId}`}
            ></Table>
        </TableProvider>
    );
}
