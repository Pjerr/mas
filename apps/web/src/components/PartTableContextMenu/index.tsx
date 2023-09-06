import { ContextMenu } from '@/components/ContextMenu';
import { ContextMenuItem } from '@/components/ContextMenu/ContextMenuItem';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { FaList, FaPen, FaTrash } from 'react-icons/fa';
import qs from 'qs';
import { useTable } from '@/hooks/useTable';
import { Part } from '@/store/api/endpoints';
import { instanceIds } from '@/types/entity';
import { EntityType } from '@/store/table/types';

interface PartTableContextMenuProps {
    rowRef: React.MutableRefObject<HTMLElement | null>;
    row: Row<Part>;
}

export function PartTableContextMenu({
    rowRef,
    row,
}: PartTableContextMenuProps) {
    const router = useRouter();

    const { removeMany } = useTable(instanceIds['Part']);

    const handleOpenEditor = () => {
        if (!row.original.id) return;

        router.push(row.original.id);
    };

    const handleOpenVariants = () => {
        if (!row.original.id) return;
        router.basePath = '/';
        router.push(
            {
                pathname: `variants/${row.original.id}`,
                query: { value: 'Main page' },
            },
            `variants/${row.original.id}`
        );
    };

    const handleDelete = () => {
        if (!row.original.id) return;

        removeMany([row.original.id], EntityType.Part);
    };

    return (
        <ContextMenu targetRef={rowRef}>
            <ContextMenuItem
                icon={<FaPen />}
                label="Open editor"
                onClick={handleOpenEditor}
            />
            <ContextMenuItem
                icon={<FaList />}
                label="Open Variants"
                onClick={handleOpenVariants}
            />
            <ContextMenuItem
                icon={<FaTrash />}
                label="Delete"
                onClick={handleDelete}
            />
        </ContextMenu>
    );
}
