import { AppDispatch, RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MasApi as Api } from '@/store/api/endpoints';

interface loadPartProps {
    partId: string;
}

const loadPartThunk = createAsyncThunk<
    void,
    loadPartProps,
    { dispatch: AppDispatch; state: RootState }
>('part-editor/loadPart', async ({ partId }, { dispatch, getState }) => {
    const { data: response } = await dispatch(
        Api.endpoints.findOnePart.initiate({
            id: partId,
        })
    );

    if (!response) throw new Error('Part not found');
});

export default loadPartThunk;
