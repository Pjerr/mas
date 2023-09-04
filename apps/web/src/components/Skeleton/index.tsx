import classNames from 'classnames';
import React, { HTMLProps } from 'react';
import styles from './styles.module.css';

interface SkeletonProps {
    variant: 'text' | 'circular' | 'rectangular' | 'rounded';
}

const Skeleton = React.forwardRef<
    HTMLDivElement,
    HTMLProps<HTMLDivElement> & SkeletonProps
>(({ variant, ...props }, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={classNames(
                styles[`skeleton-container--${variant}`],
                styles['skeleton-container'],
                props.className
            )}
        ></div>
    );
});

export default Skeleton;
