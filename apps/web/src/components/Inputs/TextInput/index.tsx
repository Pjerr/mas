import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './styles.module.css';
interface InputProps {
    icon?: React.ReactNode;
    variant?: 'underline' | 'border' | 'background';
    label?: string;
    iconPosition?: 'left' | 'right';
}

const TextInput = React.forwardRef<
    HTMLInputElement,
    InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ icon, iconPosition, variant, label, ...props }, ref) => {
    return (
        <>
            {label && <label data-cy="input-label">{label}</label>}
            <div
                className={classNames(
                    styles['input-field'],
                    styles[`input-field-${iconPosition}`],
                    {
                        [styles[`input-field-${variant}`]]: variant,
                    },
                    props.className
                )}
            >
                <input
                    ref={ref}
                    {...props}
                    value={props.value ?? ''}
                    className={classNames(styles[`input`])}
                />
                <div className={classNames(styles['icon'])}>{icon}</div>
            </div>
        </>
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;
