import classNames from 'classnames';
import React, { HTMLProps } from 'react';
import styles from './styles.module.css';

export enum SpinnerSize {
    XXL = 'xxl',
    XL = 'xl',
    L = 'l',
    MD = 'md',
    SM = 'sm',
}

interface SpinnerProps {
    spinnerSize?: SpinnerSize;
}

const Spinner = React.forwardRef<
    HTMLDivElement,
    HTMLProps<HTMLDivElement> & SpinnerProps
>(({ spinnerSize: size = SpinnerSize.MD, ...props }, ref) => {
    return (
        <div
            {...props}
            ref={ref}
            className={classNames(
                styles['spinner'],
                { [styles[`spinner--${size}`]]: size },
                props.className
            )}
        ></div>
    );
});

export default Spinner;
