import useIsOverflow from '@/hooks/useOverflow';
import React, { createRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ScrollButton from './ScrollButton';
import { TabsProvider } from './Provider';

export interface TabsProps {
    children: React.ReactNode;
    activeTab?: number;
    setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
    onSelect?: (index: number) => void;
}

function Tabs({ children, onSelect, activeTab, setActiveTab }: TabsProps) {
    const tabsRef = createRef<HTMLDivElement>();

    const isOverflown = useIsOverflow({
        ref: tabsRef,
        isVerticalOverflow: false,
    });

    function handleScroll(offset: number) {
        const tabNode = tabsRef.current;
        if (!tabNode) throw new Error('Tab ref is not set!');
        tabNode.scrollBy({
            behavior: 'smooth',
            left: offset,
        });
    }

    return (
        <React.Fragment>
            <ScrollButton
                visible={isOverflown}
                icon={<FaAngleLeft />}
                handleScroll={() => handleScroll(-100)}
            />
            <TabsProvider
                onSelect={onSelect}
                controlledActiveTab={activeTab}
                setControlledActiveTab={setActiveTab}
            >
                {children}
            </TabsProvider>
            <ScrollButton
                visible={isOverflown}
                icon={<FaAngleRight />}
                handleScroll={() => handleScroll(100)}
            />
        </React.Fragment>
    );
}

export default Tabs;
