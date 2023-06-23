import { useAppDispatch } from '@/store';
import { Attribute, Part, useFindAttributeQuery } from '@/store/api/endpoints';
import { addFormFields } from '@/store/editors/part';
import { PartForm } from '@/store/editors/part/types';
import { toast } from 'react-toastify';
import AttributeSearchResult from '../../AttributeSearchResult';

interface HeaderSearchResultProps {
    activeForm: PartForm;
    searchParam: string | null;
    shouldDisplay: boolean;
}

export default function SearchResult({
    activeForm,
    searchParam,
    shouldDisplay,
}: HeaderSearchResultProps) {
    const dispatch = useAppDispatch();

    const part = activeForm.state.defaultValues as Part;

    const addProperty = (attributes: Attribute[]) => {
        if (!attributes.length)
            throw new Error('No attributes selected for adding');

        if (!part.attributes.length) {
            dispatch(addFormFields({ attributes }));
            return;
        }

        const attributesToAdd = attributes.filter(
            (attribute) =>
                !part.attributes.some(
                    (attributeForAdd) =>
                        (attributeForAdd as Attribute).id === attribute.id
                )
        );
        if (!attributesToAdd || !attributesToAdd.length) {
            toast('This attribute is already added to product', {
                type: 'warning',
            });
            return;
        }

        dispatch(addFormFields({ attributes: attributesToAdd as Attribute[] }));
    };

    const { data: responseAttributes } = useFindAttributeQuery(
        {
            query: {
                sort: { field: 'createdAt', order: 'ASC' },
                filters: [
                    {
                        field: 'searchIndex',
                        operator: '$fulltext',
                        value: [`%${searchParam}%`],
                    },
                ],
            },
        },
        { skip: !searchParam }
    );

    if (!responseAttributes) return <></>;
    if (!shouldDisplay) return <></>;

    return (
        <AttributeSearchResult
            key={`attribute-renderer__${part.id}`}
            attributes={responseAttributes.data}
            onClick={addProperty}
        />
    );
}
