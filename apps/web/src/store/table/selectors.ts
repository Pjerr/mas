import { RootState } from '..';
import { AttributeOption, OptionConfig } from '../api/endpoints';

export const selectTable = (state: RootState) => state.table;

export const selectTableData = (state: RootState, instanceId: string) =>
    state.table[instanceId]?.data;

export const selectIsLoading = (state: RootState, instanceId: string) =>
    state.table[instanceId]?.isLoading;

export const selectTableState = (state: RootState, instanceId: string) =>
    state.table[instanceId];

export const selectSelectedRows = (state: RootState, instanceId: string) => {
    if (!state.table[instanceId]) return;

    const rowSelection = Object.keys(state.table[instanceId]?.rowSelection);
    if (!rowSelection.length) return;
    const filtered = state.table[instanceId].data.filter((entity, index) =>
        rowSelection.includes(index.toString())
    );
    return filtered.map((entity) => entity.id);
};

export const selectSelectedEntities = (
    state: RootState,
    instanceId: string,
    selectedIds: string[] | undefined
) => {
    if (!state.table[instanceId] || !selectedIds) return;
    return state.table[instanceId].data.filter((entity) =>
        selectedIds.includes(entity.id)
    );
};

export const selectConfigPayload = (state: RootState, instaceId: string) => {
    const [option] = state.table[instaceId].data as AttributeOption[];

    const configs: Partial<OptionConfig>[] = option.configs.map((config) => {
        return {
            id: option.id,
            ...(config as Partial<OptionConfig>),
        };
    });

    return configs;
};
