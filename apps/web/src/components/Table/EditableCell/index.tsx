import { useAppDispatch } from '@/store';
import React, { useContext } from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { AccordionContext } from '@/components/Accordion/Provider';
import { selectActivePartId } from '@/store/editors/part';
import TextInput from '@/components/Inputs/TextInput';
import { updateTableCell } from '@/store/table';
import { CellContext } from '@tanstack/react-table';
import { AttributeOption } from '@/store/api/endpoints';
interface EditableCellProps {}

export function EditableCell({
    cell,
}: CellContext<AttributeOption, any> & EditableCellProps) {
    const dispatch = useAppDispatch();
    const partId = useSelector(selectActivePartId);

    const [value, setValue] = React.useState(cell.getValue());

    const onBlur = () => {
        dispatch(
            updateTableCell({
                rowIndex: cell.row.index,
                columnId: cell.column.id,
                value,
                instanceId: `${partId}-${cell.row.original.attribute}`,
            })
        );
    };

    React.useEffect(() => {
        setValue(cell.getValue());
    }, [cell.getValue()]);

    return (
        <TextInput
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            className={styles['editable-cell__input']}
            variant={'border'}
        />
    );
}
