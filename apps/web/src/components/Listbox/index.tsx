import classNames from 'classnames';
import styles from './styles.module.css';
import React, { Children, cloneElement, isValidElement } from 'react';
import { ListboxProvider } from '@/components/Listbox/Provider';

export interface ListboxProps {
    children?: React.ReactNode;
    activeListItemIndex?: number;
    setActiveListItemIndex?: React.Dispatch<React.SetStateAction<number>>;
    onChange: (index: number) => void;
}

export default function Listbox({
    children,
    onChange,
    activeListItemIndex,
    setActiveListItemIndex,
}: ListboxProps) {
    const indexedChildren = Children.map(children, (child, i) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                ...child.props,
                index: i,
            });
        }
    });

    return (
        <ListboxProvider
            onChange={onChange}
            controlledActiveListItem={activeListItemIndex}
            setControlledActiveListItem={setActiveListItemIndex}
        >
            <div className={classNames(styles['listbox__container'])}>
                {indexedChildren}
            </div>
        </ListboxProvider>
    );
}
