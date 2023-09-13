import { PropertyMetadata } from '@/lib/metadata';
import { EditorMap } from '@/types/editors';
import classNames from 'classnames';
import { Control, Controller, FieldValues } from 'react-hook-form';
import styles from './styles.module.css';
interface FormFieldProps {
    metadata: PropertyMetadata;
    control: Control<FieldValues, any>;
    disabled?: boolean;
    hidden?: boolean;
}

export default function FormField({
    control,
    metadata,
    hidden,
    disabled,
}: FormFieldProps) {
    return (
        <Controller
            control={control}
            name={metadata.propertyKey}
            render={(props) => {
                const Editor = EditorMap[metadata.propertyType];
                if (!Editor) throw new Error('Editor is undefined!');
                return (
                    <div
                        className={classNames({
                            [styles['field--hidden']]: hidden,
                        })}
                    >
                        <Editor {...props} metadata={metadata} />
                    </div>
                );
            }}
        />
    );
}
