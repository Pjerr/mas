import { useAppDispatch } from '@/store';
import { Attribute, Part, useUpdatePartMutation } from '@/store/api/endpoints';
import createPart from '@/store/editors/part/thunks/createPart';

export function usePartApi() {
    const [updatePart] = useUpdatePartMutation();

    const dispatch = useAppDispatch();

    const handleUpdate = async (data: Part) => {
        const { attributes, ...rest } = data;
        const response = await updatePart({
            id: data.id,
            updatePart: {
                ...rest,
                attributeIds: attributes.map(
                    (attribute) => (attribute as Attribute).id
                ),
                properties: data.properties,
            },
        });
        return response;
    };

    const onSavePart = async (data: Part) => {
        data.createdAt
            ? await handleUpdate(data)
            : await dispatch(createPart({ data }));
    };

    return {
        onSavePart,
    };
}
