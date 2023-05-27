import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import { Tooltip } from '../Tooltip';
import { TooltipContent } from '../Tooltip/TooltipContent';
import { TooltipTrigger } from '../Tooltip/TooltipTrigger';
import styles from './styles.module.css';

interface ButtonProps {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    tooltipText?: string;
    variant?:
        | 'primary'
        | 'secondary'
        | 'danger'
        | 'info'
        | 'borderless'
        | 'outline'
        | 'full-outline';
    iconPlacement?: 'left' | 'right';
}

export const Button = React.forwardRef<
    HTMLButtonElement,
    ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(
    (
        {
            children,
            icon,
            iconPlacement,
            variant,
            disabled,
            tooltipText,
            type,
            ...props
        },
        ref
    ) => {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <button
                        {...props}
                        ref={ref}
                        className={classNames(
                            styles['button'],
                            styles[`button-${variant}`],
                            styles[`button__icon-${iconPlacement}`],
                            { [styles[`button--disabled`]]: disabled },
                            props.className
                        )}
                        type={type || 'button'}
                    >
                        <React.Fragment>
                            {icon}
                            {children}
                        </React.Fragment>
                    </button>
                </TooltipTrigger>
                {tooltipText && (
                    <TooltipContent className={styles['tooltip']}>
                        {tooltipText}
                    </TooltipContent>
                )}
            </Tooltip>
        );
    }
);
