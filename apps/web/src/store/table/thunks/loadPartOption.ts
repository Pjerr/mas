import { AppDispatch, RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { MasApi } from '@/store/api/endpoints';
import { initTable, loadData } from '..';

interface LoadPartOptionProps {
    attributeIds: string[];
    partId: string;
}

const loadPartOptions = createAsyncThunk<
    void,
    LoadPartOptionProps,
    { dispatch: AppDispatch; state: RootState }
>(
    `table/load-options`,
    async ({ attributeIds, partId }, { dispatch, getState }) => {
        const {
            isError,
            isLoading,
            data: response,
        } = await dispatch(
            MasApi.endpoints['findPartOption'].initiate({
                attributeIds,
                partId,
            })
        );

        attributeIds.forEach((id) => {
            const instanceId = `${partId}-${id}`;
            dispatch(initTable(instanceId));

            const currentAttributeOptions = response
                ? response.data.filter((option) => option.attribute === id)
                : [];

            const { table } = getState();

            if (table[instanceId].data.length === 0) {
                dispatch(
                    loadData({
                        data: currentAttributeOptions,
                        isError,
                        isLoading,
                        instanceId,
                    })
                );
            }
        });
    }
);

export default loadPartOptions;
