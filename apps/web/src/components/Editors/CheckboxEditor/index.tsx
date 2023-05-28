import React from 'react';
import { EditorProps } from '@/types/editors';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from '../styles.module.css';
import Checkbox from '@/components/Inputs/Checkbox';

export default function CheckboxEditor({
    field,
    metadata,
    formState,
}: EditorProps) {
    const { register } = useFormContext();

    return (
        <React.Fragment>
            <Checkbox
                {...register(metadata.propertyKey)}
                {...field}
                label={metadata.displayName}
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
        </React.Fragment>
    );
}
