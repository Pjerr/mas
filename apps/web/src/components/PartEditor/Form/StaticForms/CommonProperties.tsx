import { useFormContext } from 'react-hook-form';
import { EditorMap } from '@/types/editors';
import styles from '../styles.module.css';
import FormField from '@/components/FormField';
import { metadata } from './staticMetadata';

export default function CommonProperties() {
    const { control } = useFormContext();

    return (
        <div className={styles['form__group']} data-cy="product-form__common">
            <h1 className={styles['group__title']}>Common properties</h1>
            <div className={styles['group__attributes']}>
                {metadata.map((value) => {
                    const Editor = EditorMap[value.propertyType];
                    if (!Editor)
                        throw new Error(
                            `Editor ${value.propertyKey} does not exist`
                        );
                    return (
                        <FormField
                            key={value.propertyKey}
                            metadata={value}
                            control={control}
                        />
                    );
                })}
            </div>
        </div>
    );
}
