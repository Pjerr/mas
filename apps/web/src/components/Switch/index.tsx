import styles from './styles.module.css';
import classNames from 'classnames';
import React from 'react';

interface SwitchProps {
    label: string;
}

export const Switch = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & SwitchProps
>(({ label, ...props }, ref) => {
    return (
        <label className={styles['switch']} data-cy="switch">
            <label>{label}</label>
            <input
                {...props}
                type={'checkbox'}
                className={styles['switch__input']}
            />
            <span
                className={classNames(
                    styles['switch__slider'],
                    styles['switch__slider-round']
                )}
            />
        </label>
    );
});
