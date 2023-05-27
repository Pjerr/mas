import { EditorProps } from '@/types/editors';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../styles.module.css';
import { ErrorMessage } from '@hookform/error-message';
import {
    MultipleSelect,
    OptionProps,
} from '@/components/Inputs/MultipleSelect';

export default function MultipleSelectEditor({
    field,
    metadata,
    formState,
}: EditorProps) {
    const { register } = useFormContext();

    const optionsMetadata = metadata.additionalMetadata?.selectOptions;

    if (!optionsMetadata) throw new Error('Select options undefined!');

    const options: OptionProps[] = optionsMetadata.map((option) => ({
        label: option,
        value: option,
    }));

    const roles = field.value as Array<string>;

    const selectedValues: OptionProps[] | undefined = options.filter((option) =>
        roles?.find((role: string) => role === option.value)
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
            <MultipleSelect
                {...register(metadata.propertyKey)}
                {...field}
                options={options}
                selectedOptions={selectedValues}
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
