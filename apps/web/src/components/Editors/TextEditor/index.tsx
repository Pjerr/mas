import TextInput from '@/components/Inputs/TextInput';
import { EditorProps } from '@/types/editors';
import { useFormContext } from 'react-hook-form';
import React from 'react';
import styles from '../styles.module.css';
import { ErrorMessage } from '@hookform/error-message';

export default function TextEditor({
    field,
    metadata,
    formState,
}: EditorProps) {
    const { register } = useFormContext();

    return (
        <div className={styles['editor__container']}>
            <label
                className={styles['editor__label']}
                data-cy={`editor__label__${metadata.propertyKey}`}
            >
                {metadata.displayName}
            </label>
            <TextInput
                {...register(metadata.propertyKey)}
                {...field}
                variant="border"
                data-cy={`editor__${metadata.propertyKey}`}
            />
            <ErrorMessage
                errors={formState.errors}
                name={field.name}
                render={({ message }) => (
                    <span
                        data-cy="editor__error-message"
                        className={styles['error-message']}
                    >{`${metadata.displayName} ${message}`}</span>
                )}
            />
        </div>
    );
}
