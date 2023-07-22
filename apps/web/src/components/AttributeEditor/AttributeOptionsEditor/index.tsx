import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './styles.module.css';
import Button from '@/components/Button';
import { FaPlusCircle } from 'react-icons/fa';
import OptionForm from './OptionForm';

export default function AttributeOptionsEditor() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `options`,
    });

    return (
        <div className={styles['options-editor__container']}>
            <h1 className={styles['options-editor__title']}>Options</h1>
            <div className={styles['options__list']}>
                {fields.map((item, index) => {
                    return (
                        <OptionForm
                            key={`${item.id}-${index}`}
                            index={index}
                            remove={remove}
                        />
                    );
                })}
                <div className={styles['options__add-button']}>
                    <Button
                        variant="borderless"
                        onClick={() => append('')}
                        type="button"
                        icon={<FaPlusCircle />}
                    />
                </div>
            </div>
        </div>
    );
}
