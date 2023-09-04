import { EditorProps } from '@/types/editors';
import { useFormContext } from 'react-hook-form';
import React from 'react';
import styles from '../styles.module.css';
import { ErrorMessage } from '@hookform/error-message';
import TextInput from '@/components/Inputs/TextInput';

export default function TextEditor({
    field,
    metadata,
    formState,
}: EditorProps) {
    const { register } = useFormContext();

    return (
        <div className={styles['editor__container']}>
            <label className={styles['editor__label']}>
                {metadata.displayName}
            </label>
            <TextInput
                {...register(metadata.propertyKey)}
                {...field}
                variant="border"
                className={styles['editor__field']}
            />
            <ErrorMessage
                errors={formState.errors}
                name={field.name}
                render={({ message }) => (
                    <span
                        className={styles['error-message']}
                    >{`${metadata.displayName} ${message}`}</span>
                )}
            />
        </div>
    );
}
