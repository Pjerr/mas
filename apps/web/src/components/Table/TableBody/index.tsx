import { Row } from '@tanstack/react-table';
import React, { useRef } from 'react';
import styles from './styles.module.css';
import { useTableSelector } from '@/hooks/useTable';
import {
    ContextMenuMap,
    ContextMenuType,
} from '@/components/ContextMenu/types';
import { TableRow } from './TableRow';

interface TableBodyProps {
    instanceId: string;
    onRowDoubleClick?: (row: Row<any>) => void;
    contextMenuType?: ContextMenuType;
}

export default function TableBody({
    instanceId,
    onRowDoubleClick,
    contextMenuType = ContextMenuType.None,
}: TableBodyProps) {
    const rowRef = useRef(null);

    const table = useTableSelector(instanceId);

    if (!table) throw new Error(`Table ${instanceId} does not exist`);

    const onDoubleClick = (row: Row<any>) => {
        if (!onRowDoubleClick) return;
        onRowDoubleClick(row);
    };

    const ContextMenu = ContextMenuMap[contextMenuType];

    return (
        <tbody className={styles['table__body']}>
            {table.getRowModel().rows.map((row) => (
                <TableRow
                    key={`${instanceId}-table-row-${row.id}`}
                    instanceId={instanceId}
                    row={row}
                    contextMenuType={contextMenuType}
                    onRowDoubleClick={onDoubleClick}
                />
            ))}
        </tbody>
    );
}
