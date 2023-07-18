import {
    Attribute,
    AttributeOption,
    CreateConfig,
    Part,
} from '@/store/api/endpoints';
import { AttributePath } from '../types';
import { TableInstance } from '@/store/table/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/store';
import { MasApi } from '@/store/api/endpoints';
import { toast } from 'react-toastify';
import { updateDefaultFormValue } from '..';

interface CreateProps {
    data: Part;
}

const attributeConfigs = (
    attributeConfigPaths: AttributePath[],
    table: Record<string, TableInstance>
) => {
    const instanceIds = attributeConfigPaths.map((path) => path.instanceId);
    return instanceIds.map((instanceId) => {
        const attributeOptions = table[instanceId];

        const configs: CreateConfig[] = attributeOptions.data.map(
            (option: Partial<AttributeOption>) => {
                const config =
                    option.configs && option.configs.length > 0
                        ? option.configs[0]
                        : { price: 0 };

                return {
                    option: option.id!,
                    ...config,
                } as CreateConfig;
            }
        );
        return configs;
    });
};

const createThunk = createAsyncThunk<
    void,
    CreateProps,
    { dispatch: AppDispatch; state: RootState }
>('part-editor/create', async ({ data }, { dispatch, getState }) => {
    const { attributes, ...rest } = data;
    const { partEditor, table } = getState();
    const config = attributeConfigs(partEditor.attributePaths[data.id], table);
    const response = await dispatch(
        MasApi.endpoints['createPart'].initiate({
            createPart: {
                ...rest,
                name: data.name,
                attributeIds: data.attributes.map((a) => (a as Attribute).id),
                attributeConfigs: config,
            },
        })
    );

    if ('error' in response) {
        toast(`${response.error}`, { type: 'error' });
        return;
    }

    const part = response.data.data;
    console.log(part);
    dispatch(
        updateDefaultFormValue({
            part,
        })
    );
    toast(`Part created`, {
        type: 'success',
    });
});

export default createThunk;
