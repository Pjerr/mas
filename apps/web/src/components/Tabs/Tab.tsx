import classNames from 'classnames';
import React, { HTMLProps, useContext } from 'react';
import styles from './styles.module.css';
import { TabsContext } from './Provider';

export interface TabProps {
    title: string;
    index?: number;
}

const Tab = React.forwardRef<
    HTMLDivElement,
    HTMLProps<HTMLDivElement> & TabProps
>(({ index, title, ...rest }, ref) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === index;

    const handleTabSelect = () => {
        if (index === null || index === undefined) return;
        if (index < 0) throw new Error('Tabs index is not defined');
        if (!isActive) setActiveTab(index);
    };

    return (
        <div
            {...rest}
            className={classNames(
                styles['tab'],
                {
                    [styles['tab--active']]: isActive,
                },
                rest.className
            )}
            onClick={handleTabSelect}
        >
            {title}
        </div>
    );
});

export default Tab;
