import { createAsyncThunk } from '@reduxjs/toolkit';
import { EntityType } from '../types';
import { AppDispatch } from '@/store';

interface RemoveManyProps {
    instanceId: string;
    ids: string[];
    type: EntityType;
}

const removeManyThunk = createAsyncThunk<
    void,
    RemoveManyProps,
    { dispatch: AppDispatch }
>(`table/removeMany`, async ({ ids, instanceId, type }, { dispatch }) => {
    //TODO
});

export default removeManyThunk;
