import { EditorMap } from '@/types/editors';
import { Controller, useFormContext } from 'react-hook-form';
import { FaMinusCircle } from 'react-icons/fa';
import styles from './styles.module.css';
import { optionsFormMetadata } from '@/components/AttributeEditor/metadata';
import Button from '@/components/Button';
import { PropertyMetadata } from '@/lib/metadata';

interface OptionFormProps {
    index: number;
    remove: (index?: number | number[] | undefined) => void;
}

export default function OptionForm({ index, remove }: OptionFormProps) {
    const { control } = useFormContext();
    return (
        <div className={styles['option']} key={`option-form__${index}`}>
            <div className={styles['remove-button__container']}>
                <Button
                    onClick={() => remove(index)}
                    icon={<FaMinusCircle />}
                />
            </div>
            {optionsFormMetadata.map((generalMetadata) => (
                <Controller
                    key={`options[${index}].${generalMetadata.propertyKey}`}
                    name={
                        `options[${index}].${generalMetadata.propertyKey}` as string
                    }
                    control={control}
                    render={(props) => {
                        const optionMeta: PropertyMetadata = {
                            displayName: generalMetadata.displayName,
                            isArray: generalMetadata.isArray,
                            propertyType: generalMetadata.propertyType,
                            propertyKey: `options[${index}].${generalMetadata.propertyKey}`,
                        };
                        const Editor = EditorMap[optionMeta.propertyType];
                        if (!Editor) return <></>;
                        return <Editor {...props} metadata={optionMeta} />;
                    }}
                />
            ))}
        </div>
    );
}
