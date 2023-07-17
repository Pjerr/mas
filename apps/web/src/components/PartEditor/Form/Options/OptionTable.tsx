import { AccordionContext } from '@/components/Accordion/Provider';
import Table from '@/components/Table';
import { partOptionColumnDef } from '@/components/Table/ColumnDef';
import { TableProvider } from '@/components/Table/TableProvider';
import { useTable } from '@/hooks/useTable';
import { useAppDispatch } from '@/store';
import {
    addAttributePath,
    selectActivePartId,
    selectAttributeConfigPaths,
} from '@/store/editors/part';
import { useContext, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

interface OptionTableProps {
    attributeId: string;
}

export default function OptionsTable({ attributeId }: OptionTableProps) {
    const partId = useSelector(selectActivePartId);
    const { activeItem } = useContext(AccordionContext);
    const dispatch = useAppDispatch();
    const attributePath = useSelector(selectAttributeConfigPaths);

    const instanceId = useMemo(() => {
        return `${partId}-${activeItem}`;
    }, [partId, activeItem]);

    useEffect(() => {
        dispatch(
            addAttributePath({
                partId,
                attributeId,
                instanceId,
            })
        );
    }, [!attributePath]);

    const { loadOptionConfig } = useTable();

    useEffect(() => {
        loadOptionConfig(instanceId, attributeId, partId);
    }, [attributeId, partId]);

    return (
        <TableProvider key={`option-grid__${attributeId}`}>
            <Table
                placeholder={`Option table is empty`}
                view={partOptionColumnDef}
                refetch={() => {}}
                instanceId={instanceId}
                showPagination={true}
            ></Table>
        </TableProvider>
    );
}
