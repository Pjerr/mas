import { useTableSelector } from '@/hooks/useTable';
import styles from './styles.module.css';
import { HeaderColumn } from './HeaderColumn';

interface TableHeaderProps {
    instanceId: string;
}

export function TableHeader({ instanceId }: TableHeaderProps) {
    const table = useTableSelector(instanceId);

    if (!table) return <></>;

    return (
        <thead className={styles['table__thead']}>
            {table.getHeaderGroups().map((headerGroup) => {
                return (
                    <tr key={headerGroup.id} className={styles['table__row']}>
                        {headerGroup.headers.map((header) => (
                            <HeaderColumn key={header.id} header={header} />
                        ))}
                    </tr>
                );
            })}
        </thead>
    );
}
