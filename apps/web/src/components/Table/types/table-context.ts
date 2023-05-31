import { Table } from '@tanstack/react-table';
import { createContext } from 'react';

export interface TableContextProps {
    refreshRefs: Function;
    addInstance: (instanceId: string, table: Table<any>) => void;
    removeInstance: (instanceId: string) => void;
    getInstance: (instanceId: string) => Table<any> | null;
}

export const TableContext = createContext<TableContextProps>({
    refreshRefs: () => {},
    addInstance: () => {},
    removeInstance: () => {},
    getInstance: (instanceId: string) => null,
});
