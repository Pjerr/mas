import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import React, { useMemo } from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { createValidationSchema } from './utils/validation-schema';
import { selectPartForm, setDraftForm } from '@/store/editors/part';
import { Attribute, Part } from '@/store/api/endpoints';
import CommonProperties from './StaticForms/CommonProperties';
import FormButtons from './FormButtons';
import { usePartApi } from '@/hooks/usePartApi';
import FormGroups from './DynamicForms/FormGroups';
import Options from './Options';
import { useAppDispatch } from '@/store';

export default function PartForm() {
    const { onSavePart } = usePartApi();

    const dispatch = useAppDispatch();

    const form = useSelector(selectPartForm);
    const part = form?.value as Part;
    const validationSchema = useMemo(() => {
        return createValidationSchema(part.attributes);
    }, [part, part.properties, part.attributes]);

    const methods = useForm<Part>({
        values: part,
        resolver: joiResolver(validationSchema, {
            allowUnknown: true,
        }),
        mode: 'onBlur',
    });
    const { handleSubmit, reset, formState, watch } = methods;
    const onSubmit: SubmitHandler<Part> = async (data) => {
        onSavePart(data);
    };

    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (!name || !type) return;
            dispatch(
                setDraftForm({
                    draftValue: value as Part,
                })
            );
        });

        return () => subscription.unsubscribe();
    }, [watch, form]);

    const handleCancel = () => {
        reset(part);
    };

    return (
        <FormProvider {...methods} key={`form-provider__${part.id}`}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
                <CommonProperties key={`cpt`} />
                <FormGroups part={part} />
                <Options
                    attributes={part.attributes.filter(
                        (attribute) => attribute.editorType === 'options'
                    )}
                />
                <FormButtons
                    handleCancel={handleCancel}
                    generateDisabled={!formState.isValid}
                />
            </form>
        </FormProvider>
    );
}
