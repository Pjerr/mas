import { createAsyncThunk } from '@reduxjs/toolkit';
import { EntityType } from '../types';
import { AppDispatch } from '@/store';
import { MasApi as Api } from '@/store/api/endpoints';
import { removeManyNotation } from '@/store/api/types';
import { removeMany } from '..';
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
    await dispatch(Api.endpoints[removeManyNotation[type]].initiate({ ids }));
    dispatch(removeMany({ ids, instanceId }));
});

export default removeManyThunk;
