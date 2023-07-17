import { AppDispatch, RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MasApi } from '@/store/api/endpoints';
import { loadData } from '..';

interface LoadPartOptionProps {
    instanceId: string;
    attributeId: string;
    partId: string;
}

const loadPartOptions = createAsyncThunk<
    void,
    LoadPartOptionProps,
    { dispatch: AppDispatch; state: RootState }
>(
    `table/load-options`,
    async ({ attributeId, partId, instanceId }, { dispatch, getState }) => {
        const {
            data: response,
            isError,
            isLoading,
        } = await dispatch(
            MasApi.endpoints['findPartOption'].initiate({
                attributeId,
                partId,
            })
        );
        const { table } = getState();

        if (!table[instanceId].data || table[instanceId].data.length === 0) {
            dispatch(
                loadData({
                    data: response ? response.data : [],
                    isError,
                    isLoading,
                    instanceId,
                })
            );
        }
    }
);

export default loadPartOptions;
