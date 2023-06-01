import { useAppDispatch } from '@/store';
import { Attribute, Part, useUpdatePartMutation } from '@/store/api/endpoints';
import { toast } from 'react-toastify';

export function useProductApi() {
    // const [createPart] = useCreateProductMutation();
    const [updatePart] = useUpdatePartMutation();

    const dispatch = useAppDispatch();

    const handleUpdate = async (data: Part, id: string) => {
        const { attributes, ...rest } = data;
        const response = await updatePart({
            id,
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

    // const handleCreate = async (data: Part) => {
    //     const { attributes, ...rest } = data;
    //     const response = await createPart({
    //         createProduct: {
    //             ...rest,
    //             name: data.name,
    //             attributeIds: data.attributes.map(
    //                 (attribute) => (attribute as Attribute).id
    //             ),
    //         },
    //     });
    //     return response;
    // };

    const onSaveProduct = async (data: Part, id?: string) => {
        // const response = id
        //     ? await handleUpdate(data, id)
        //     : await handleCreate(data);
        // if (!('data' in response)) {
        //     toast(`${response.error}`, { type: 'error' });
        //     return;
        // }
        // toast(`Part ${id ? 'updated' : 'created'}`, {
        //     type: 'success',
        // });
    };

    return {
        onSaveProduct,
    };
}
