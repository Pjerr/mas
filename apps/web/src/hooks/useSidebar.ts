import { TabItem } from '@/components/Sidebar/types';
import React from 'react';
import { useState } from 'react';

export const useSidebar = () => {
    const [tabs, setTabs] = useState<TabItem[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);

    function toggleSidebar(tabId: string) {
        activeTabId === tabId ? setActiveTabId(null) : setActiveTabId(tabId);
    }

    function addTab(newTab: TabItem) {
        const tabIndex = tabs.findIndex((tab) => tab.id === newTab.id);

        const tabsCopy = tabs.slice();

        if (tabIndex >= 0) {
            tabsCopy.splice(tabIndex, 1, newTab);
            setTabs(tabsCopy);
        } else {
            tabsCopy.push(newTab);
            setTabs(tabsCopy);
        }
    }

    function addTabs(newTabs: TabItem[]) {
        newTabs.forEach((newTab) => {
            const foundIndex = tabs.findIndex((tab) => newTab.id === tab.id);
            if (foundIndex >= 0) {
                newTabs.splice(foundIndex, 1);
            }
        });

        setTabs([...tabs, ...newTabs]);
    }

    function getActiveTab() {
        return tabs.find((tab) => tab.id === activeTabId);
    }

    function removeTab(tabId: string) {
        const tabsCopy = tabs.slice().filter((tab) => tab.id !== tabId);
        setTabs(tabsCopy);
    }

    function clearSidebar() {
        setTabs([]);
        setActiveTabId(null);
    }

    return React.useMemo(
        () => ({
            tabs,
            getActiveTab,
            toggleSidebar,
            addTab,
            addTabs,
            removeTab,
            clearSidebar,
        }),
        [tabs, getActiveTab, toggleSidebar, addTab, removeTab, clearSidebar]
    );
};

type ContextType = ReturnType<typeof useSidebar> | null;

export const SidebarContext = React.createContext<ContextType>(null);

export const useSidebarContext = () => {
    const context = React.useContext(SidebarContext);

    if (!context) throw new Error('Sidebar context is null');

    return context;
};
