import { createAsyncThunk } from '@reduxjs/toolkit';
import { EntityType } from '../types';
import { AppDispatch, RootState } from '@/store';
import { instanceIds } from '@/types/entity';

interface LoadDataProps {
    sourceId?: string;
    type: EntityType;
}

export const orderMap = (isDesc: boolean) => (isDesc ? 'DESC' : 'ASC');

const loadDataThunk = createAsyncThunk<
    void,
    LoadDataProps,
    { dispatch: AppDispatch; state: RootState }
>('table/loadData', async ({ type, sourceId }, { dispatch, getState }) => {
    const table = getState();

    const instanceId = instanceIds[type];

    //TODO
});

export default loadDataThunk;
