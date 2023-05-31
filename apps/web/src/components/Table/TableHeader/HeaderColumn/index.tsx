import { flexRender, Header } from '@tanstack/react-table';
import styles from './styles.module.css';
import ColumDirection from '../../ColumnDirection';

interface HeaderColumnProps {
    header: Header<any, unknown>;
}

export function HeaderColumn({ header }: HeaderColumnProps) {
    return (
        <th
            key={header.id}
            colSpan={header.colSpan}
            className={styles['table__table-header']}
        >
            {header.isPlaceholder ? null : (
                <div className={styles['table__table-header-container']}>
                    <div
                        className={styles['table-header__sort-container']}
                        onClick={header.column.getToggleSortingHandler()}
                        data-cy="table-header__sort-container"
                    >
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {header.column.getCanSort() && (
                            <ColumDirection dir={header.column.getIsSorted()} />
                        )}
                    </div>
                </div>
            )}
        </th>
    );
}
