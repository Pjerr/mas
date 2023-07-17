import { TableContext } from '@/components/Table/types/table-context';
import { useAppDispatch } from '@/store';
import { initTable, loadTableDataThunk, removeManyThunk } from '@/store/table';
import loadPartOptions from '@/store/table/thunks/loadPartOption';
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

    async function loadOptionConfig(
        instanceId: string,
        attributeId: string,
        partId: string
    ) {
        await dispatch(loadPartOptions({ attributeId, partId, instanceId }));
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
            loadOptionConfig,
        };
    }, [loadTableData, removeMany, clearTableData, loadOptionConfig]);
};

export const useTableSelector = (instanceId: string) => {
    const { getInstance } = useContext(TableContext);
    const table = getInstance(instanceId);
    return table;
};
