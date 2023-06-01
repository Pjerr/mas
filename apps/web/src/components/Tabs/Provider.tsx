import { createContext, useEffect, useState } from 'react';

interface TabsContextProps {
    activeTab: number | null;
    setActiveTab: (id: number) => void;
}

const TabsContext = createContext<TabsContextProps>({
    activeTab: null,
    setActiveTab: () => {},
});

const TabsProvider = ({
    children,
    onSelect,
    controlledActiveTab,
    setControlledActiveTab,
}: {
    children: React.ReactNode;
    onSelect?: (index: number) => void;
    controlledActiveTab?: number;
    setControlledActiveTab?: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [uncontrolledActiveTab, setUncontrolledActiveTab] =
        useState<number>(0);

    const activeTab = controlledActiveTab ?? uncontrolledActiveTab;
    const setActiveTab = setControlledActiveTab ?? setUncontrolledActiveTab;

    useEffect(() => {
        if (!onSelect) return;
        onSelect(activeTab);
    }, [activeTab]);

    return (
        <TabsContext.Provider
            value={{
                activeTab,
                setActiveTab,
            }}
        >
            {children}
        </TabsContext.Provider>
    );
};

export { TabsProvider, TabsContext };
