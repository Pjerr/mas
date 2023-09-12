import { EditorProps } from '@/types/editors';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../styles.module.css';
import { ErrorMessage } from '@hookform/error-message';
import { OptionProps } from '@/components/Inputs/Select';
import CreatableSelect from '@/components/Inputs/CreateableSelect';
import { useCreateManufacturerMutation } from '@/store/api/endpoints';
import { toast } from 'react-toastify';

export default function CreatableSelectEditor({
    field,
    metadata,
    formState,
}: EditorProps) {
    const { register } = useFormContext();
    const options = metadata.additionalMetadata?.selectOptions;

    const [createManufacturer] = useCreateManufacturerMutation();

    const handleCreateOption = async (input: string) => {
        const response = await createManufacturer({
            createManufacturer: {
                name: input,
            },
        });

        if ('error' in response) {
            toast('Error while creating manufacturer', { type: 'error' });
            return;
        }
        toast('Manufacturer created', { type: 'success' });
    };

    if (!options) throw new Error('Select options undefined!');
    const selectedOption: OptionProps | undefined = options.find(
        (option) => option.value === field.value
    );

    return (
        <div className={styles['editor__container']}>
            <label className={styles['editor__label']}>
                {metadata.displayName}
            </label>
            <CreatableSelect
                {...register(metadata.propertyKey)}
                {...field}
                options={options}
                value={selectedOption}
                onCreateOption={handleCreateOption}
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
