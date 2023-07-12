import { Part } from '@/store/api/endpoints';
import Button from '@/components/Button';
import { FaCheck } from 'react-icons/fa';
import styles from './styles.module.css';
import TextInput from '@/components/Inputs/TextInput';
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from 'react';

interface BulkPriceFormProps {
    parts: Part[];
    onBulkPriceEdit: (selectedIds: string[], payloads: number[]) => void;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
interface BulkFormPricePart {
    id: string;
    name: string;
    basePrice: number;
}

export function BulkPriceForm({
    parts,
    onBulkPriceEdit,
    setIsModalOpen,
}: BulkPriceFormProps) {
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
        const selectedIds = formItems.map((item) => item.id);
        const payloads = formItems.map((item) => Number(item.basePrice));
        setIsModalOpen(false);
        onBulkPriceEdit(selectedIds, payloads);
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
