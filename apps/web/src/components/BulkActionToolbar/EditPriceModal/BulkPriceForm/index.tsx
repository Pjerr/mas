import { Part, useMultipleUpdatePartMutation } from '@/store/api/endpoints';
import Button from '@/components/Button';
import { FaCheck } from 'react-icons/fa';
import styles from './styles.module.css';
import TextInput from '@/components/Inputs/TextInput';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface BulkPriceFormProps {
    parts: Part[];
}
interface BulkFormPricePart {
    id: string;
    name: string;
    basePrice: number;
}

export function BulkPriceForm({ parts }: BulkPriceFormProps) {
    const [multipleUpdate] = useMultipleUpdatePartMutation();

    const initialValues: BulkFormPricePart[] = useMemo(() => {
        return parts.map(
            (part) =>
                ({
                    id: part.id,
                    basePrice: part.basePrice,
                    name: part.name,
                } as BulkFormPricePart)
        );
    }, [parts]);

    const [formValues, setFormValues] = useState<BulkFormPricePart[]>(
        initialValues ?? []
    );

    useEffect(() => {
        setFormValues(initialValues);
    }, [initialValues]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await multipleUpdate({
            ids: formValues.map((item) => item.id),
            multipleUpdatePart: {
                payloads: formValues.map((item) => ({
                    basePrice: item.basePrice,
                })),
            },
        });
        if ('error' in response) {
            toast('Something went wrong', { type: 'error' });
            return;
        }
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = event.target;
        const newFormValues = [...formValues];
        newFormValues[index] = {
            ...newFormValues[index],
            basePrice: Number(value),
        };
        setFormValues(newFormValues);
    };

    return (
        <form onSubmit={onSubmit} className={styles['bulk__form']}>
            {formValues.map((part, index) => (
                <div key={part.id} className={styles[`form__item`]}>
                    <label className={styles['item__name']}>
                        Part name: {part.name}
                    </label>
                    <TextInput
                        value={part.basePrice}
                        variant={'border'}
                        onChange={(event) => handleChange(event, index)}
                    />
                </div>
            ))}
            <Button type="submit" icon={<FaCheck />} variant={'primary'}>
                Save
            </Button>
        </form>
    );
}
