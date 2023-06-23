import { useSidebarContext } from '@/hooks/useSidebar';
import { Children, cloneElement, isValidElement, useEffect } from 'react';
import styles from './styles.module.css';
import { TabItem } from '@/components/Sidebar/types';
import { SidebarPanelProps } from '@/components/Sidebar/SidebarPanel';

interface SidebarPanelsProps {
    children: React.ReactNode;
}
export default function SidebarPanels({ children }: SidebarPanelsProps) {
    const { addTabs, removeTabs } = useSidebarContext();

    const indexedChildren = Children.map(children, (child, i) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                ...child.props,
                index: i,
            });
        }
    });

    useEffect(() => {
        if (!indexedChildren) return;
        const tabs: TabItem[] = indexedChildren.map((child) => {
            const { title, children } = child.props as SidebarPanelProps;

            return {
                title,
                component: () => children,
            };
        });

        addTabs(tabs);

        const indexes = Array.from({ length: indexedChildren.length }).map(
            (_, index) => index
        );

        return () => removeTabs(indexes);
    }, []);

    return <div className={styles['sidebar-panels']}>{indexedChildren}</div>;
}
