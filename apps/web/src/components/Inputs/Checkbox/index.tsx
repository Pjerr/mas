import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { useMergeRefs } from '@floating-ui/react';

interface CheckboxProps {
    label?: string;
    indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
    HTMLInputElement,
    CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, indeterminate, ...props }, ref) => {
    const checkboxRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (
            checkboxRef &&
            checkboxRef.current &&
            typeof indeterminate === 'boolean'
        ) {
            checkboxRef.current.indeterminate = !props.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    const refs = useMergeRefs([ref, checkboxRef]);

    return (
        <div className={styles['checkbox-wrapper']}>
            <label className={styles['checkbox-label']}>{label}</label>
            <input
                ref={refs}
                type="checkbox"
                className={classNames(props.className, styles['checkbox'])}
                {...props}
            />
        </div>
    );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
