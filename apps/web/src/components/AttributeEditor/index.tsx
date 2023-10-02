import { Attribute } from '@/store/api/endpoints';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormButtons from './FormButtons';
import {
    attributeMetadata,
    selectOptions,
} from '@/components/AttributeEditor/metadata';
import styles from './styles.module.css';
import { EditorType, EditorValidation } from 'shared';
import { useSelector } from 'react-redux';
import FormField from '@/components/FormField';
import { selectAttributeEditor } from '@/store/editors/attribute';
import { createAttributeValidationSchema } from './utils/validation-schema';
import { joiResolver } from '@hookform/resolvers/joi';
import { EditorMode } from '@/store/editors/enums';
import AttributeOptionsEditor from './AttributeOptionsEditor';
import { Switch } from '../Switch';
import { EditorValidationMap } from '@/types/editors';

interface AttributeEditorProps {
    onUpdate: (data: Attribute, attributeId: string) => void;
    onCreate: (data: Attribute) => void;
}

export default function AttributeEditor({
    onUpdate,
    onCreate,
}: AttributeEditorProps) {
    const state = useSelector(selectAttributeEditor);

    const [hasOptions, setHasOptions] = useState<boolean>(false);

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
        if (state.attribute?.editorType === EditorType.Options) {
            setHasOptions(true);
            return;
        }
        setHasOptions(false);
    }, [state.attribute]);

    const onSubmit = (data: any) => {
        const editorValidation =
            EditorValidationMap[data.editorType as EditorType];

        const payload: Attribute = {
            ...data,
            editorValidation: hasOptions
                ? EditorValidation.None
                : editorValidation,
            editorType: hasOptions ? EditorType.Options : data.editorType,
        };

        state.attribute
            ? onUpdate(payload, state.attribute.id)
            : onCreate(payload);
    };

    const selectEditor = watch('editorType');

    const showButtonEditor = (editorType: EditorType) => {
        return (
            editorType === EditorType.Select ||
            editorType === EditorType.MultipleSelect
        );
    };

    return (
        <div className={styles['form__container']}>
            <span className={styles['form__title']}>
                {state.mode === EditorMode.Create
                    ? 'Create attribute'
                    : 'Update attribute'}
            </span>
            <span className={styles['form__subtitle']}>
                {state.group?.name}
            </span>
            <FormProvider {...methods}>
                <form
                    className={styles['form']}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={classNames(styles['form__inputs'])}>
                        <Switch
                            label="Options"
                            checked={hasOptions}
                            onChange={() => setHasOptions(!hasOptions)}
                            data-cy="form__options-switch"
                        />
                        {Object.values(attributeMetadata).map((metadata) => (
                            <FormField
                                key={metadata.propertyKey}
                                metadata={metadata}
                                control={control}
                                hidden={
                                    hasOptions &&
                                    metadata.propertyKey === 'editorType'
                                        ? true
                                        : false
                                }
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
                    {hasOptions && <AttributeOptionsEditor />}

                    <FormButtons />
                </form>
            </FormProvider>
        </div>
    );
}
