import { useFormContext } from 'react-hook-form';
import { EditorMap } from '@/types/editors';
import styles from '../styles.module.css';
import FormField from '@/components/FormField';
import { metadata } from './staticMetadata';
import { useFindManufacturerQuery } from '@/store/api/endpoints';
import { useMemo } from 'react';
import { EditorType, EditorValidation } from 'shared';

export default function CommonProperties() {
    const { control } = useFormContext();

    const { data: manufacturers } = useFindManufacturerQuery({ query: {} });

    console.log(manufacturers);

    const newMetadata = useMemo(() => {
        const newMetadata = [...metadata];
        newMetadata.push({
            displayName: 'Manufacturer',
            propertyKey: 'manufacturer',
            propertyType: EditorType.Select,
            isArray: true,
            propertyValidation: EditorValidation.Array,
            additionalMetadata: {
                selectOptions: manufacturers
                    ? manufacturers.data.map((manu) => ({
                          value: manu.id,
                          label: manu.name,
                      }))
                    : [],
            },
        });
        return newMetadata;
    }, [manufacturers]);

    if (!manufacturers) return <></>;

    return (
        <div className={styles['form__group']} data-cy="product-form__common">
            <h1 className={styles['group__title']}>Common properties</h1>
            <div className={styles['group__attributes']}>
                {newMetadata.map((value) => {
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
