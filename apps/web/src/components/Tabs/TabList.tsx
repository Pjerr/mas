import {
    Children,
    HTMLProps,
    ReactNode,
    cloneElement,
    isValidElement,
} from 'react';
import styles from './styles.module.css';
import React from 'react';

interface TabListProps {
    children: ReactNode;
}

const TabList = React.forwardRef<
    HTMLDivElement,
    TabListProps & HTMLProps<HTMLDivElement>
>(({ children, ...props }, ref) => {
    const indexedChildren = Children.map(children, (child, i) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                ...child.props,
                index: i,
            });
        }
    });

    return (
        <div className={styles['tabs']} ref={ref} {...props}>
            {indexedChildren}
        </div>
    );
});

export default TabList;
