import { useAppDispatch } from '@/store';
import {
    Manufacturer,
    useCreateManufacturerMutation,
    useUpdateManufacturerMutation,
} from '@/store/api/endpoints';
import { appendEntity, updateEntity } from '@/store/table';
import { EntityType } from '@/store/table/types';
import { instanceIds } from '@/types/entity';
import { toast } from 'react-toastify';

export function useManufacturerApi() {
    const dispatch = useAppDispatch();

    const [createManufacturer] = useCreateManufacturerMutation();
    const [updateManufacturer] = useUpdateManufacturerMutation();

    async function handleCreateManufacturer(data: Manufacturer) {
        const response = await createManufacturer({
            createManufacturer: {
                ...data,
            },
        });

        if ('data' in response) {
            dispatch(
                appendEntity({
                    entity: response.data.data,
                    instanceId: instanceIds[EntityType.Manufacturer],
                })
            );
            toast('Created manufacturer', { type: 'success' });
        } else toast('Failed to create entity', { type: 'error' });
    }

    async function handleUpdateManufacturer(data: Manufacturer, id: string) {
        const response = await updateManufacturer({
            id,
            updateManufacturer: {
                ...data,
            },
        });

        if ('data' in response) {
            dispatch(
                updateEntity({
                    entity: response.data.data,
                    instanceId: instanceIds[EntityType.Manufacturer],
                })
            );
            toast('Updated manufacturer', { type: 'success' });
        } else toast('Failed to update entity', { type: 'error' });
    }

    return {
        createManufacturer: handleCreateManufacturer,
        updateManufacturer: handleUpdateManufacturer,
    };
}
