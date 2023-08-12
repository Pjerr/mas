import { TableContext } from '@/components/Table/types/table-context';
import { useAppDispatch } from '@/store';
import { initTable, loadTableDataThunk, removeManyThunk } from '@/store/table';
import loadVariantsThunk from '@/store/table/thunks/loadVariants';
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

    async function loadVariantData(partId: string) {
        await dispatch(loadVariantsThunk({ partId }));
    }

    return useMemo(() => {
        return {
            loadTableData,
            removeMany,
            clearTableData,
            loadVariantData,
        };
    }, [loadTableData, removeMany, clearTableData, loadVariantData]);
};

export const useTableSelector = (instanceId: string) => {
    const { getInstance } = useContext(TableContext);
    const table = getInstance(instanceId);
    return table;
};
