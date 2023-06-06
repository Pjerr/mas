import { AppDispatch, RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MasApi as Api } from '@/store/api/endpoints';

interface loadPartProps {
    productId: string;
}

const loadPartThunk = createAsyncThunk<
    void,
    loadPartProps,
    { dispatch: AppDispatch; state: RootState }
>('part-editor/loadData', async ({ productId }, { dispatch, getState }) => {
    const { data: response } = await dispatch(
        Api.endpoints.findOnePart.initiate({
            id: productId,
        })
    );

    if (!response) throw new Error('Part not found');
});

export default loadPartThunk;
