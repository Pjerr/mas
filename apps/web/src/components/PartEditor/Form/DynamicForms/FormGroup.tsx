import { HTMLProps } from 'react';
import styles from '../styles.module.css';
import React from 'react';

interface FormGroupProps {
    index: number;
    name: string;
    children: React.ReactNode;
    show?: boolean;
}

const FormGroup = React.forwardRef<
    HTMLDivElement,
    HTMLProps<HTMLDivElement> & FormGroupProps
>(({ index, name, children, show = true, ...props }, ref) => {
    if (!show) return <></>;

    return (
        <div
            {...props}
            ref={ref}
            className={styles[`form__group`]}
            id={`group-${index}`}
        >
            <h1 className={styles['group__title']}>{name}</h1>
            <div className={styles['group__attributes']}>{children}</div>
        </div>
    );
});

FormGroup.displayName = 'FormGroup';

export default FormGroup;
