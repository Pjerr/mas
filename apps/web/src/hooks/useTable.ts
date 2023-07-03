import { TableContext } from '@/components/Table/types/table-context';
import { useAppDispatch } from '@/store';
import { initTable, loadTableDataThunk, removeManyThunk } from '@/store/table';
import { EntityType } from '@/store/table/types';
import { instanceIds } from '@/types/entity';
import { useContext, useMemo } from 'react';

export const useTable = (instanceId?: string) => {
    const dispatch = useAppDispatch();

    async function loadTableData(type: EntityType, sourceId?: string) {
        await dispatch(
            loadTableDataThunk({
                type,
                sourceId,
                instanceId: instanceId || instanceIds[type],
            })
        );
    }

    async function removeMany(ids: string[], type: EntityType) {
        if (!instanceId) return;
        await dispatch(removeManyThunk({ ids, type, instanceId }));
    }

    function clearTableData() {
        if (!instanceId) return;
        dispatch(initTable(instanceId));
    }

    return useMemo(() => {
        return {
            loadTableData,
            removeMany,
            clearTableData,
        };
    }, [loadTableData, removeMany, clearTableData]);
};

export const useTableSelector = (instanceId: string) => {
    const { getInstance } = useContext(TableContext);
    const table = getInstance(instanceId);
    return table;
};
