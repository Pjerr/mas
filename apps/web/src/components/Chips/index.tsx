import React, { Children, cloneElement, isValidElement } from 'react';
import { HTMLProps } from 'react';
import styles from './styles.module.css';
import { ChipsProvider } from './Provider';

export interface ChipsProps {
    children?: React.ReactNode;
    onSelect: (index: number) => void;
}

const Chips = React.forwardRef<
    HTMLDivElement,
    Omit<HTMLProps<HTMLDivElement>, 'onSelect'> & ChipsProps
>(({ children, onSelect, ...rest }, ref) => {
    const indexedChildren = Children.map(children, (child, i) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                ...child.props,
                index: i,
            });
        }
    });

    return (
        <div className={styles['chips__container']} ref={ref} {...rest}>
            <ChipsProvider onSelect={onSelect}>{indexedChildren}</ChipsProvider>
        </div>
    );
});

export default Chips;
