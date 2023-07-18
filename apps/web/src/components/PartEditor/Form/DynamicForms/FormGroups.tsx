import FormField from '@/components/FormField';
import { Attribute, Part } from '@/store/api/endpoints';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { getAttributeGroups } from '../../utils';
import FormGroup from './FormGroup';
import { createDynamicMetadata } from './createDynamicMetadata';

export default function FormGroups({ part }: { part: Part }) {
    const { control } = useFormContext();

    const groups: Record<string, Attribute[]> = useMemo(() => {
        return getAttributeGroups(part.attributes);
    }, [part]);

    if (!groups) return <></>;

    return (
        <>
            {Object.entries(groups).map(([groupId, attributes], index) => (
                <FormGroup
                    key={`form__group-${groupId}`}
                    index={index}
                    name={
                        attributes[0]
                            ? attributes[0].group.name
                            : `Group-${index}`
                    }
                    data-cy="form__form-group"
                >
                    {attributes.map((attribute) => {
                        const metadata = createDynamicMetadata(attribute);
                        return (
                            <FormField
                                key={`form__field-${attribute.id}`}
                                control={control}
                                metadata={metadata}
                            />
                        );
                    })}
                </FormGroup>
            ))}
        </>
    );
}
