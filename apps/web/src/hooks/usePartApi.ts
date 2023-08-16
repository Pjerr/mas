import { useAppDispatch } from '@/store';
import {
    AttributeOption,
    CreateConfig,
    Part,
    useCreatePartMutation,
    useCreateVariantsPartMutation,
    useUpdatePartMutation,
    useUpdateVariantsPartMutation,
} from '@/store/api/endpoints';
import { updateDefaultFormValue } from '@/store/editors/part';
import { appendEntity, selectTable, updateEntity } from '@/store/table';
import { EntityType } from '@/store/table/types';
import { instanceIds } from '@/types/entity';
import { produce } from 'immer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export function usePartApi() {
    const [updatePart] = useUpdatePartMutation();
    const [createPart] = useCreatePartMutation();
    const [createVariants] = useCreateVariantsPartMutation();
    const [updateVariants] = useUpdateVariantsPartMutation();

    const dispatch = useAppDispatch();
    const table = useSelector(selectTable);

    const generateAttributeConfigs = (
        attributeIds: string[],
        partId: string
    ) => {
        const instanceIds = attributeIds.map((id) => `${partId}-${id}`);

        return instanceIds.map((instanceId) => {
            const attributeOptions = table[instanceId];

            const configs: CreateConfig[] = attributeOptions.data.map(
                (option: Partial<AttributeOption>) => {
                    const config =
                        option.configs && option.configs.length > 0
                            ? option.configs[0]
                            : { price: 0 };

                    return {
                        ...config,
                        option: option.id!,
                    };
                }
            );

            return configs;
        });
    };

    const handleCreate = async (
        part: Part,
        attributeConfigs: CreateConfig[][]
    ) => {
        const { attributes, ...rest } = part;
        return await createPart({
            createPart: {
                ...rest,
                name: part.name,
                attributeConfigs,
                attributeIds: attributes.map((attribute) => attribute.id),
            },
        });
    };

    const handleUpdate = async (
        part: Part,
        attributeConfigs: CreateConfig[][]
    ) => {
        const { attributes, ...rest } = part;
        const response = await updatePart({
            id: part.id,
            updatePart: {
                ...rest,
                attributeIds: attributes.map((attribute) => attribute.id),
                properties: part.properties,
                attributeConfigs,
            },
        });
        return response;
    };

    const onSavePart = async (data: Part) => {
        const { attributes } = data;

        const attributeConfigs = generateAttributeConfigs(
            attributes.map((a) => a.id),
            data.id
        );

        const response = data.createdAt
            ? await handleUpdate(data, attributeConfigs)
            : await handleCreate(data, attributeConfigs);

        if ('error' in response) {
            toast('Error while update/create part', { type: 'error' });
            return;
        }

        const part = response.data.data;

        dispatch(updateDefaultFormValue({ part }));

        if (data.createdAt) {
            updateVariants({ updateVariant: { partId: data.id } });
            dispatch(
                updateEntity({
                    entity: part,
                    instanceId: instanceIds[EntityType.Part],
                })
            );
            toast('Updated part', { type: 'success' });
        } else {
            createVariants({ createVariant: { partId: data.id } });
            dispatch(
                appendEntity({
                    entity: part,
                    instanceId: instanceIds[EntityType.Part],
                })
            );
            toast('Created part and variants', { type: 'success' });
        }
    };

    return {
        onSavePart,
    };
}
