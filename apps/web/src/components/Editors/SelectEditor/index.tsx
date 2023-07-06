import { EditorProps } from '@/types/editors';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import styles from '../styles.module.css';
import { ErrorMessage } from '@hookform/error-message';
import Select, { OptionProps } from '@/components/Inputs/Select';

export default function SelectEditor({
    field,
    metadata,
    formState,
}: EditorProps) {
    const { register } = useFormContext();
    const options = metadata.additionalMetadata?.selectOptions;

    if (!options) throw new Error('Select options undefined!');

    const selectedOption: OptionProps | undefined = options.find(
        (option) => option.value === field.value
    );

    return (
        <div
            className={styles['editor__container']}
            data-cy={`editor__${metadata.propertyKey}`}
        >
            <label
                className={styles['editor__label']}
                data-cy={`editor__label__${metadata.propertyKey}`}
            >
                {metadata.displayName}
            </label>
            <Select
                {...register(metadata.propertyKey)}
                {...field}
                options={options}
                selectedOptions={selectedOption}
                classNamePrefix={`editor__${metadata.propertyKey}`}
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
