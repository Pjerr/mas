import { variantInstaceId } from '@/utils/constants';
import { TableProvider } from '../Table/TableProvider';
import { VariantHeader } from './VariantHeader';
import Table from '../Table';
import { variantColumnDef } from '../Table/ColumnDef';

interface VariantsProps {
    partId?: string;
}
export default function PartVariants({ partId }: VariantsProps) {
    const instanceId = variantInstaceId(partId);
    return (
        <TableProvider>
            <VariantHeader instanceId={instanceId}></VariantHeader>

            <Table
                view={variantColumnDef}
                refetch={() => {}}
                placeholder={'Variants table is empty'}
                instanceId={instanceId}
            ></Table>
        </TableProvider>
    );
}
