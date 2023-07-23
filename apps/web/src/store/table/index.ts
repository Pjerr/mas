import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
    ColumnFiltersAction,
    EntityAction,
    LoadDataAction,
    RefreshStateAction,
    RemoveManyAction,
    RowSelectionAction,
    SortingAction,
    UpdateCellAction,
    initialInstance,
} from './types';
import objectPath from 'object-path';

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        initTable: (state, { payload }: PayloadAction<string>) => {
            state[payload] = initialInstance;
        },
        loadData: (state, { payload }: PayloadAction<LoadDataAction>) => {
            const instanceId = payload.instanceId;
            if (!state[instanceId]) state[instanceId] = initialInstance;
            state[instanceId].data = payload.data;
            state[instanceId].isError = payload.isError;
            state[instanceId].isLoading = payload.isLoading;
        },
        refreshState: (
            state,
            { payload }: PayloadAction<RefreshStateAction>
        ) => {
            state[payload.instanceId].data = [];
        },
        removeMany: (state, { payload }: PayloadAction<RemoveManyAction>) => {
            const instanceId = payload.instanceId;
            state[instanceId].data = state[instanceId].data.filter(
                (entity) => !payload.ids.includes(entity.id)
            );
        },
        setSorting: (state, { payload }: PayloadAction<SortingAction>) => {
            const instanceId = payload.instanceId;
            state[instanceId].sorting = payload.sortingState;
        },
        setColumnFilters: (
            state,
            { payload }: PayloadAction<ColumnFiltersAction>
        ) => {
            const instanceId = payload.instanceId;
            state[instanceId].columnFilters = payload.columnFilters;
        },
        setRowSelection: (
            state,
            { payload }: PayloadAction<RowSelectionAction>
        ) => {
            const instanceId = payload.instanceId;
            state[instanceId].rowSelection = payload.rowSelection;
        },
        appendEntity: (state, { payload }: PayloadAction<EntityAction>) => {
            const instanceId = payload.instanceId;
            if (payload.entity && state[instanceId].data) {
                state[instanceId].data.push(payload.entity);
            }
        },
        updateEntity: (state, { payload }: PayloadAction<EntityAction>) => {
            const instanceId = payload.instanceId;
            if (!payload.entity || !state[instanceId].data) return;
            const index = state[instanceId].data.findIndex(
                (entity) => entity.id === payload.entity.id
            );
            if (state[instanceId].data && index !== undefined) {
                state[instanceId].data[index] = payload.entity;
            }
        },
        updateTableCell: (
            state,
            { payload }: PayloadAction<UpdateCellAction>
        ) => {
            const instanceId = payload.instanceId;
            const option = state[instanceId].data[payload.rowIndex];
            objectPath.set(option, `${payload.columnId}`, payload.value);
        },
    },
});

export const {
    initTable,
    loadData,
    refreshState,
    removeMany,
    setColumnFilters,
    setSorting,
    setRowSelection,
    appendEntity,
    updateEntity,
    updateTableCell,
} = tableSlice.actions;

export * from './selectors';

export * from './thunks';

export default tableSlice.reducer;
