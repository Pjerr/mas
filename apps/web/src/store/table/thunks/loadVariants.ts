import { AppDispatch, RootState, enhancedApi } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadData } from '..';
import { addVariantColumns } from '@/components/Table/ColumnDef';

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
        enhancedApi.endpoints['findVariantsPart'].initiate({
            query: {
                filters: [
                    {
                        field: 'part',
                        operator: '$eq',
                        value: [partId],
                    },
                ],
                sort: {
                    field: 'id',
                    order: 'ASC',
                },
            },
        })
    );

    if (response?.data) {
        addVariantColumns(response.data);
        dispatch(
            loadData({
                data: response.data ? response.data : [],
                isError,
                isLoading,
                instanceId: `variants-table-${partId}`,
            })
        );
    }
});

export default loadVariantsThunk;
