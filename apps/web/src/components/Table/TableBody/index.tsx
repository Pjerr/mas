import { flexRender } from '@tanstack/react-table';
import React from 'react';
import styles from './styles.module.css';
import { useTableSelector } from '@/hooks/useTable';

interface TableBodyProps {
    instanceId: string;
}

export default function TableBody({ instanceId }: TableBodyProps) {
    const table = useTableSelector(instanceId);

    if (!table) throw new Error(`Table ${instanceId} does not exist`);

    return (
        <tbody className={styles['table__body']}>
            {table.getRowModel().rows.map((row) => (
                <React.Fragment key={`fragment-${row.index}`}>
                    <tr key={row.id}>
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
