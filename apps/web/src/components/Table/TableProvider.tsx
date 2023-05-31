import { Table } from '@tanstack/react-table';
import { FC, ReactNode, useState } from 'react';
import { TableContext } from './types/table-context';
import useRerender from '@/hooks/useRenderer';

export type TableProps = {
    children?: ReactNode;
};

export const TableProvider: FC<TableProps> = ({ children }) => {
    const [instances, setInstances] = useState<Record<string, Table<any>>>({});

    const rerender = useRerender();

    const addInstance = (instanceId: string, table: Table<any>) =>
        setInstances({ [instanceId]: table });

    const removeInstance = (instanceId: string) => delete instances[instanceId];

    const getInstance = (instanceId: string) => instances[instanceId];

    return (
        <TableContext.Provider
            value={{
                refreshRefs: rerender,
                addInstance,
                removeInstance,
                getInstance,
            }}
        >
            {children}
        </TableContext.Provider>
    );
};
