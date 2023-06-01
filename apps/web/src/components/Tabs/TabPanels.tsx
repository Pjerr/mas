import { Children, ReactNode, cloneElement, isValidElement } from 'react';
import styles from './styles.module.css';

interface TabPanelsProps {
    children: ReactNode;
}

export default function TabPanels({ children }: TabPanelsProps) {
    const indexedChildren = Children.map(children, (child, i) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                ...child.props,
                index: i,
            });
        }
    });
    return <div className={styles['tabs-panels']}>{indexedChildren}</div>;
}
