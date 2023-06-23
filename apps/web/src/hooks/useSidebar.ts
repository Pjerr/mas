import { TabItem } from '@/components/Sidebar/types';
import React from 'react';
import { useState } from 'react';

export const useSidebar = () => {
    const [tabs, setTabs] = useState<TabItem[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function toggleSidebar(index: number) {
        activeIndex === index ? setActiveIndex(null) : setActiveIndex(index);
    }

    function addTab(tab: TabItem) {
        setTabs([...tabs, tab]);
    }

    function addTabs(newTabs: TabItem[]) {
        setTabs([...tabs, ...newTabs]);
    }

    function removeTab(tabIndex: number) {
        const newTabs = tabs.slice();
        newTabs.splice(tabIndex, 1);
        setTabs(newTabs);
    }

    function removeTabs(tabIndexes: number[]) {
        const newTabs = tabs.slice();
        newTabs.filter((_, index) => !tabIndexes.includes(index));
        setTabs(newTabs);
    }

    function clearSidebar() {
        setTabs([]);
        setActiveIndex(null);
    }

    return React.useMemo(
        () => ({
            tabs,
            activeIndex,
            addTab,
            addTabs,
            removeTab,
            removeTabs,
            toggleSidebar,
            clearSidebar,
            setTabs,
            setActiveIndex,
        }),
        [
            tabs,
            activeIndex,
            setTabs,
            addTab,
            addTabs,
            removeTab,
            removeTabs,
            toggleSidebar,
            clearSidebar,
            setActiveIndex,
        ]
    );
};

type ContextType = ReturnType<typeof useSidebar> | null;

export const SidebarContext = React.createContext<ContextType>(null);

export const useSidebarContext = () => {
    const context = React.useContext(SidebarContext);

    if (!context) throw new Error('Sidebar context is null');

    return context;
};
