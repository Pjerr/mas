import { RootState } from '..';

export const selectTableData = (state: RootState, instanceId: string) =>
    state.table[instanceId].data;

export const selectIsLoading = (state: RootState, instanceId: string) =>
    state.table[instanceId].isLoading;

export const selectTableState = (state: RootState, instanceId: string) =>
    state.table[instanceId];

export const selectSelectedRows = (state: RootState, instanceId: string) => {
    if (!state.table[instanceId]) return;

    const rowSelection = Object.keys(state.table[instanceId].rowSelection);
    if (!rowSelection.length) return;
    const filtered = state.table[instanceId].data.filter((entity, index) => {
        rowSelection.includes(index.toString());
    });
    return filtered.map((entity) => entity.id);
};
