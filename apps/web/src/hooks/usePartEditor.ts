import { useAppDispatch } from '@/store';
import { Attribute } from '@/store/api/endpoints';
import {
    addFormFields,
    selectActivePartId,
    selectFormAttributes,
} from '@/store/editors/part';
import loadPartOptions from '@/store/table/thunks/loadPartOption';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export function usePartEditor() {
    const dispatch = useAppDispatch();
    const partId = useSelector(selectActivePartId);
    const formAttributes = useSelector(selectFormAttributes);

    const addProperty = async (attributes: Attribute[]) => {
        if (!attributes.length) throw new Error('No attributes selected');

        if (!formAttributes?.length) {
            await dispatch(
                loadPartOptions({
                    attributeIds: attributes.map((a) => a.id),
                    partId,
                })
            );
            return;
        }

        const newProperties = attributes.filter(
            (attribute) =>
                !formAttributes.find(
                    (formAttirbute) => attribute.id === formAttirbute.id
                )
        );

        if (!newProperties.length) {
            toast('Attributes already exist in part', {
                type: 'info',
            });
            return;
        }

        dispatch(addFormFields({ attributes: newProperties }));

        await dispatch(
            loadPartOptions({
                attributeIds: newProperties.map((attribute) => attribute.id),
                partId,
            })
        );
    };

    return {
        addProperty,
    };
}
