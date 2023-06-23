import { Attribute } from '@/store/api/endpoints';
import classNames from 'classnames';
import React, { useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormButtons from './FormButtons';
import {
    attributeMetadata,
    selectOptions,
} from '@/components/AttributeEditor/metadata';
import styles from './styles.module.css';
import { EditorType } from 'shared';
import { useSelector } from 'react-redux';
import FormField from '@/components/FormField';
import { selectAttributeEditor } from '@/store/editors/attribute';
import { createAttributeValidationSchema } from './utils/validation-schema';
import { joiResolver } from '@hookform/resolvers/joi';
import { EditorMode } from '@/store/editors/enums';
import AttributeOptionsEditor from './AttributeOptionsEditor';

interface AttributeEditorProps {
    onUpdate: (data: Attribute, attributeId: string) => void;
    onCreate: (data: Attribute) => void;
}

export default function AttributeEditor({
    onUpdate,
    onCreate,
}: AttributeEditorProps) {
    const state = useSelector(selectAttributeEditor);

    const validationSchema = useMemo(() => {
        return createAttributeValidationSchema();
    }, [state.attribute]);

    const methods = useForm({
        resolver: joiResolver(validationSchema, {
            allowUnknown: true,
        }),
        mode: 'onBlur',
    });

    const { handleSubmit, watch, reset, control } = methods;

    useEffect(() => {
        reset(state.attribute);
    }, [state.attribute]);

    const onSubmit = (data: any) => {
        state.attribute ? onUpdate(data, state.attribute.id) : onCreate(data);
    };

    const selectEditor = watch('editorType');

    const showButtonEditor = (editorType: EditorType) => {
        return (
            editorType === EditorType.Select ||
            editorType === EditorType.MultipleSelect
        );
    };

    const showAttributeOptions = (editorType: EditorType) => {
        return editorType === EditorType.Options;
    };

    return (
        <div className={styles['form__container']}>
            <span className={styles['form__title']} data-cy="form__title">
                {state.mode === EditorMode.Create
                    ? 'Create attribute'
                    : 'Update attribute'}
            </span>
            <span className={styles['form__subtitle']} data-cy="form__subtitle">
                {state.group?.name}
            </span>
            <FormProvider {...methods}>
                <form
                    className={styles['form']}
                    onSubmit={handleSubmit(onSubmit)}
                    data-cy="form"
                >
                    <div
                        className={classNames(styles['form__inputs'])}
                        data-cy="form__inputs"
                    >
                        {Object.values(attributeMetadata).map((metadata) => (
                            <FormField
                                key={metadata.propertyKey}
                                metadata={metadata}
                                control={control}
                            />
                        ))}
                        {showButtonEditor(selectEditor) && (
                            <FormField
                                key={selectOptions.propertyKey}
                                metadata={selectOptions}
                                control={control}
                            />
                        )}
                    </div>
                    {showAttributeOptions(selectEditor) && (
                        <AttributeOptionsEditor />
                    )}

                    <FormButtons />
                </form>
            </FormProvider>
        </div>
    );
}
