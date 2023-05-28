import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
    ColumnFiltersAction,
    LoadDataAction,
    RefreshStateAction,
    RemoveManyAction,
    SortingAction,
    initialInstance,
} from './types';

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
    },
});

export const {
    initTable,
    loadData,
    refreshState,
    removeMany,
    setColumnFilters,
    setSorting,
} = tableSlice.actions;

export * from './selectors';

export * from './thunks';

export default tableSlice.reducer;
