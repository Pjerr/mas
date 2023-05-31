import { AppDispatch } from '@/store';
import {
    Attribute,
    MasApi as Api,
    useCreateAttributeMutation,
    useUpdateAttributeMutation,
} from '@/store/api/endpoints';
import { appendEntity, updateEntity } from '@/store/table';
import { EntityType } from '@/store/table/types';
import { instanceIds } from '@/types/entity';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export function useAttributeApi() {
    const dispatch = useDispatch<AppDispatch>();

    const [createAttribute] = useCreateAttributeMutation();
    const [updateAttribute] = useUpdateAttributeMutation();

    async function handleCreateAttribute(data: Attribute, groupId: string) {
        const response = await createAttribute({
            createAttribute: {
                ...data,
                groupId,
            },
        });

        if ('data' in response) {
            dispatch(
                appendEntity({
                    entity: response.data.data,
                    instanceId: instanceIds[EntityType.Attribute],
                })
            );
            toast('Created attribute', { type: 'success' });
        } else toast('Failed to create entity', { type: 'error' });
    }

    async function handleUpdateAttribute(
        data: Attribute,
        attributeId: string,
        groupId: string
    ) {
        const response = await updateAttribute({
            id: attributeId,
            updateAttribute: {
                ...data,
                groupId,
            },
        });

        if ('data' in response) {
            dispatch(
                updateEntity({
                    entity: response.data.data,
                    instanceId: instanceIds[EntityType.Attribute],
                })
            );
            toast('Updated attribute', { type: 'success' });
        } else toast('Failed to update entity', { type: 'error' });
    }

    return {
        createAttribute: handleCreateAttribute,
        updateAttribute: handleUpdateAttribute,
    };
}
