import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import React, { useMemo } from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { createValidationSchema } from './utils/validation-schema';
import { selectPartForm } from '@/store/editors/part';
import { Attribute, Part } from '@/store/api/endpoints';
import CommonProperties from './StaticForms/CommonProperties';
import FormButtons from './FormButtons';
import { usePartApi } from '@/hooks/usePartApi';
import FormGroups from './DynamicForms/FormGroups';
import Options from './Options';

export default function PartForm() {
    const { onSavePart } = usePartApi();

    const form = useSelector(selectPartForm);
    const part = form?.state.defaultValues as Part;
    const validationSchema = useMemo(() => {
        return createValidationSchema(part.attributes as Attribute[]);
    }, [part, part.properties, part.attributes]);

    const methods = useForm<Part>({
        values: part,
        resolver: joiResolver(validationSchema, {
            allowUnknown: true,
        }),
        mode: 'onBlur',
    });
    const { handleSubmit, reset, formState } = methods;
    const onSubmit: SubmitHandler<Part> = async (data) => {
        onSavePart(data, part.id);
    };

    // const onInvalid = (data: any) => {
    //     console.log(data);
    // };

    const handleCancel = () => {
        reset(part);
    };

    return (
        <FormProvider {...methods} key={`form-provider__${part.id}`}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
                <CommonProperties key={`cpt`} />
                <FormGroups part={part} />
                <Options
                    attributes={
                        part.attributes.filter(
                            (attribute) =>
                                (attribute as Attribute).editorType ===
                                'options'
                        ) as Attribute[]
                    }
                />
                <FormButtons
                    handleCancel={handleCancel}
                    generateDisabled={!formState.isValid}
                />
            </form>
        </FormProvider>
    );
}
