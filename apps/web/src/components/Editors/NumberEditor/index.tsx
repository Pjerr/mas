import { EditorProps } from '@/types/editors';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../styles.module.css';
import { ErrorMessage } from '@hookform/error-message';
import NumberInput from '@/components/Inputs/NumberInput';

export function NumberEditor({ field, metadata, formState }: EditorProps) {
    const { register } = useFormContext();
    return (
        <div className={styles['editor__container']}>
            <label className={styles['editor__label']}>
                {metadata.displayName}
            </label>
            <NumberInput
                {...register(metadata.propertyKey, {
                    pattern: /^[0-9]+$/,
                })}
                {...field}
                variant={'border'}
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
