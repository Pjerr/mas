import { Part, useBulkUpdatePricePartMutation } from '@/store/api/endpoints';
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
    const [bulkUpdatePrice] = useBulkUpdatePricePartMutation();

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

    const [formItems, setFormItems] = useState<BulkFormPricePart[]>(
        initialValues ?? []
    );

    useEffect(() => {
        setFormItems(initialValues);
    }, [initialValues]);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await bulkUpdatePrice({
            ids: formItems.map((item) => item.id),
            bulkUpdatePrice: {
                payloads: formItems.map((item) => Number(item.basePrice)),
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
        const newFormValues = [...formItems];
        newFormValues[index] = {
            ...newFormValues[index],
            basePrice: Number(value),
        };
        setFormItems(newFormValues);
    };

    return (
        <form onSubmit={onSubmit} className={styles['bulk__form']}>
            {formItems.map((part, index) => (
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
