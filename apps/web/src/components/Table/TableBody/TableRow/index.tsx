import { Row, flexRender } from '@tanstack/react-table';
import React, { useRef } from 'react';
import styles from '../styles.module.css';
import {
    ContextMenuMap,
    ContextMenuType,
} from '@/components/ContextMenu/types';

interface TableRowProps {
    row: Row<any>;
    instanceId: string;
    onRowDoubleClick?: (row: Row<any>) => void;
    contextMenuType?: ContextMenuType;
}

export function TableRow({
    row,
    onRowDoubleClick,
    instanceId,
    contextMenuType = ContextMenuType.None,
}: TableRowProps) {
    const rowRef = useRef(null);

    const onDoubleClick = (row: Row<any>) => {
        if (!onRowDoubleClick) return;
        onRowDoubleClick(row);
    };

    const ContextMenu = ContextMenuMap[contextMenuType];

    return (
        <React.Fragment key={`fragment-${row.index}`}>
            <tr
                key={row.id}
                className={styles['table__row']}
                onDoubleClick={() => onDoubleClick(row)}
                ref={rowRef}
            >
                {row.getVisibleCells().map((cell) => (
                    <td
                        key={`cell-${cell.id}`}
                        className={styles['cell']}
                        data-cy={`cell-${cell.id}`}
                        {...{
                            style: {
                                width: `${cell.column.getSize()}%`,
                            },
                        }}
                    >
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </td>
                ))}
            </tr>

            {ContextMenu && <ContextMenu row={row} rowRef={rowRef} />}
        </React.Fragment>
    );
}
