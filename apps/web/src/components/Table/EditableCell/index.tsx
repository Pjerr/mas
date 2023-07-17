import { useAppDispatch } from '@/store';
import React, { useContext } from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { AccordionContext } from '@/components/Accordion/Provider';
import { selectActivePartId } from '@/store/editors/part';
import TextInput from '@/components/Inputs/TextInput';
import { updateTableCell } from '@/store/table';
interface EditableCellProps {
    rowIndex: number;
    columnId: string;
    value: unknown;
}

export function EditableCell({
    columnId,
    rowIndex,
    value: initialValue,
}: EditableCellProps) {
    const dispatch = useAppDispatch();
    const partId = useSelector(selectActivePartId);
    const { activeItem } = useContext(AccordionContext);

    const [value, setValue] = React.useState(initialValue);

    const onBlur = () => {
        dispatch(
            updateTableCell({
                rowIndex,
                columnId,
                value,
                instanceId: `${partId}-${activeItem}`,
            })
        );
    };

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <TextInput
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            className={styles['editable-cell__input']}
        />
    );
}
