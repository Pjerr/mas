import TextInput from '@/components/Inputs/TextInput';
import classNames from 'classnames';
import React, { HTMLProps, useEffect } from 'react';
import styles from './styles.module.css';
import { InplaceInputButtons } from './InplaceInputButtons';

interface InplaceInputProps {
    initialValue: string;
    open: boolean;
    onSave: (title: string) => void;
    onCancel?: () => void;
}

const InplaceInput = React.forwardRef<
    HTMLInputElement,
    InplaceInputProps & HTMLProps<HTMLInputElement>
>(({ initialValue, onCancel, onSave, open, ...rest }, ref) => {
    const [value, setValue] = React.useState(initialValue);
    const [mode, setMode] = React.useState(open);

    useEffect(() => {
        setMode(open);
    }, [open]);

    function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.stopPropagation();
        e.preventDefault();
        setMode(false);
        onSave(value);
    }

    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();
        setValue(initialValue);
        setMode(false);
        if (onCancel) onCancel();
    }

    if (!mode)
        return <div className={styles['inplace-container']}>{value}</div>;

    return (
        <div className={classNames(styles['inplace-container'])}>
            <React.Fragment>
                <form
                    className={classNames(styles['inplace-form'])}
                    onSubmit={handleSave}
                    data-cy="inplace__form"
                >
                    <TextInput
                        {...rest}
                        ref={ref}
                        variant={'underline'}
                        autoFocus={true}
                        placeholder={value}
                        value={value}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setValue(e.target.value)}
                        data-cy="inplace__input"
                    />
                    <InplaceInputButtons handleCancel={handleCancel} />
                </form>
            </React.Fragment>
        </div>
    );
});

InplaceInput.displayName = 'InplaceInput';

export default InplaceInput;
