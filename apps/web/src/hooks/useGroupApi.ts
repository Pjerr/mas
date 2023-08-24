import {
    useCreateGroupMutation,
    useRemoveGroupMutation,
    useUpdateGroupMutation,
} from '@/store/api/endpoints';
import { toast } from 'react-toastify';

export function useGroupApi() {
    const [createGroup] = useCreateGroupMutation();
    const [updateGroup] = useUpdateGroupMutation();
    const [removeGroup] = useRemoveGroupMutation();

    async function handleCreate(changes: string) {
        return await createGroup({
            createGroup: {
                name: changes,
            },
        });
    }

    async function handleUpdate(changes: string, id: string) {
        return await updateGroup({
            id,
            updateGroup: {
                name: changes,
            },
        });
    }

    async function onSaveGroup(id: string | undefined, changes: string) {
        const response = id
            ? await handleUpdate(changes, id)
            : await handleCreate(changes);

        if ('error' in response) {
            toast(`Error occured`, {
                type: 'error',
                toastId: `error-${id}`,
            });
            return;
        }
        const message = id ? 'updated' : 'created';
        toast(`Group ${message}`, { type: 'success', toastId: id });

        return response.data.data;
    }

    async function onRemoveGroup(id: string) {
        const response = await removeGroup({ id });

        if ('error' in response) {
            toast(`${response.error}`, {
                type: 'error',
                toastId: `error-${id}`,
            });
            return;
        }

        toast('Group deleted', { type: 'success', toastId: id });
    }

    return { onSaveGroup, onRemoveGroup };
}
