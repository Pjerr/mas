import { Row, flexRender } from '@tanstack/react-table';
import React from 'react';
import styles from './styles.module.css';
import { useTableSelector } from '@/hooks/useTable';
import classNames from 'classnames';

interface TableBodyProps {
    instanceId: string;
    onRowDoubleClick?: (row: Row<any>) => void;
}

export default function TableBody({
    instanceId,
    onRowDoubleClick,
}: TableBodyProps) {
    const table = useTableSelector(instanceId);

    if (!table) throw new Error(`Table ${instanceId} does not exist`);

    const onDoubleClick = (row: Row<any>) => {
        if (!onRowDoubleClick) return;
        onRowDoubleClick(row);
    };

    return (
        <tbody className={styles['table__body']}>
            {table.getRowModel().rows.map((row) => (
                <React.Fragment key={`fragment-${row.index}`}>
                    <tr
                        key={row.id}
                        className={classNames(styles['table__row'], {
                            [styles['table__row--disabled']]:
                                row.original.disabled,
                        })}
                        onDoubleClick={() => onDoubleClick(row)}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={`cell-${cell.id}`}
                                className={styles['cell']}
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
                </React.Fragment>
            ))}
        </tbody>
    );
}
