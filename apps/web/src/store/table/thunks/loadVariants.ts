import { addVariantColumns } from '@/components/Table/ColumnDef';
import { AppDispatch, RootState, enhancedApi } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadData } from '..';

interface LoadVariantsProps {
    partId: string;
}

const loadVariantsThunk = createAsyncThunk<
    void,
    LoadVariantsProps,
    { dispatch: AppDispatch; state: RootState }
>('grid/loadVariant', async ({ partId }, { dispatch }) => {
    const {
        isError,
        isLoading,
        data: response,
    } = await dispatch(
        enhancedApi.endpoints['findVariantPart'].initiate({
            id: partId,
        })
    );

    if (response?.data) {
        addVariantColumns(response.data);
        dispatch(
            loadData({
                data: response.data.configs ? response.data.configs : [],
                isError,
                isLoading,
                instanceId: `variants-table-${partId}`,
            })
        );
    }
});

export default loadVariantsThunk;
