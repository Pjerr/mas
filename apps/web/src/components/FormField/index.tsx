import { PropertyMetadata } from '@/lib/metadata';
import { EditorMap } from '@/types/editors';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface FormFieldProps {
    metadata: PropertyMetadata;
    control: Control<FieldValues, any>;
}

export default function FormField({ control, metadata }: FormFieldProps) {
    return (
        <Controller
            control={control}
            name={metadata.propertyKey}
            render={(props) => {
                const Editor = EditorMap[metadata.propertyType];
                if (!Editor) throw new Error('Editor is undefined!');
                return <Editor {...props} metadata={metadata} />;
            }}
        />
    );
}
