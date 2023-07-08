import { FormProvider, useForm } from 'react-hook-form';
import { Part } from '@/store/api/endpoints';
import Button from '@/components/Button';
import { FaCheck } from 'react-icons/fa';
import FormField from '@/components/FormField';
import { EditorType, EditorValidation } from 'shared';
import styles from './styles.module.css';

interface BulkPriceFormProps {
    parts: Part[];
}

export function BulkPriceForm({ parts }: BulkPriceFormProps) {
    const methods = useForm();

    const { control, handleSubmit } = methods;

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles['bulk__form']}
            >
                {parts.map((part, index) => (
                    <div key={part.id} className={styles[`form__item`]}>
                        <label className={styles['item__name']}>
                            Part name: {part.name}
                        </label>
                        <FormField
                            control={control}
                            metadata={{
                                displayName: 'Base Price',
                                propertyKey: `basePrice.[${index}]`,
                                propertyType: EditorType.Number,
                                isArray: false,
                                propertyValidation:
                                    EditorValidation.DecimalNumber,
                            }}
                        />
                    </div>
                ))}
                <Button type="submit" icon={<FaCheck />} variant={'primary'}>
                    Save
                </Button>
            </form>
        </FormProvider>
    );
}
