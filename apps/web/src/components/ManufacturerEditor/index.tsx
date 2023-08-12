import { Manufacturer } from '@/store/api/endpoints';
import { selectManufacturerEditor } from '@/store/editors/manufacturer';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createManufacturerValidationSchema } from './utils/validation-schema';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './styles.module.css';
import { EditorMode } from '@/store/editors/enums';
import classNames from 'classnames';
import FormField from '../FormField';
import { manufacturerMetadata } from './metadata';
import FormButtons from './FormButtons';

interface ManufacturerEditorProps {
    onUpdate: (data: Manufacturer, manufacturerId: string) => void;
    onCreate: (data: Manufacturer) => void;
}

export default function ManufacturerEditor({
    onUpdate,
    onCreate,
}: ManufacturerEditorProps) {
    const state = useSelector(selectManufacturerEditor);

    const validationSchema = useMemo(() => {
        return createManufacturerValidationSchema();
    }, [state.manufacturer]);

    const methods = useForm({
        resolver: joiResolver(validationSchema, {
            allowUnknown: true,
        }),
        mode: 'onBlur',
    });

    const { handleSubmit, reset, control } = methods;

    useEffect(() => {
        reset(state.manufacturer);
    }, [state.manufacturer]);

    const onSubmit = (data: any) => {
        state.manufacturer
            ? onUpdate(data, state.manufacturer.id)
            : onCreate(data);
    };

    return (
        <div className={styles['form__container']}>
            <span className={styles['form__title']}>
                {state.mode === EditorMode.Create
                    ? 'Create manufacturer'
                    : 'Update manufacturer'}
            </span>
            <FormProvider {...methods}>
                <form
                    className={styles['form']}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={classNames(styles['form__inputs'])}>
                        {Object.values(manufacturerMetadata).map((metadata) => (
                            <FormField
                                key={metadata.propertyKey}
                                metadata={metadata}
                                control={control}
                            />
                        ))}
                    </div>

                    <FormButtons />
                </form>
            </FormProvider>
        </div>
    );
}
