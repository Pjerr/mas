import React from 'react';
import { useListboxContext } from './Provider';
import styles from './styles.module.css';
import classNames from 'classnames';
interface ListItemProps {
    index?: number;
    children: React.ReactNode;
}

export default function ListItem({ children, index }: ListItemProps) {
    const { activeItem, setActiveItem } = useListboxContext();
    const isActive = activeItem === index;

    const handleItemSelect = () => {
        if (index === undefined || index === null) return;
        if (index < 0) throw new Error('Listbox index is not defined');
        if (!isActive) setActiveItem(index);
    };

    return (
        <div
            className={classNames(styles['list-item'], {
                [styles['list-item--active']]: isActive,
            })}
            onClick={handleItemSelect}
        >
            {children}
        </div>
    );
}
