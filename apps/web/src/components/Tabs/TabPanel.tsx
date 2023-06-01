import { ReactNode, useContext } from 'react';
import styles from './styles.module.css';
import { TabsContext } from '@/components/Tabs/Provider';

interface TabPanelsProps {
    children: ReactNode;
    index?: number;
}

export default function TabPanel({ children, index }: TabPanelsProps) {
    const { activeTab } = useContext(TabsContext);
    if (activeTab !== index) return <></>;
    return (
        <div className={styles['tab-panel']} data-cy={`tab-panel__${index}`}>
            {children}
        </div>
    );
}
