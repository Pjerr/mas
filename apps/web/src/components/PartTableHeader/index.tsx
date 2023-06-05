import Tabs from '@/components/Tabs';
import Tab from '@/components/Tabs/Tab';
import TabList from '@/components/Tabs/TabList';
import TabPanel from '@/components/Tabs/TabPanel';
import TabPanels from '@/components/Tabs/TabPanels';
import React from 'react';
import {
    PartTableHeaderProps as PartTableHeaderProps,
    PartTableHeaderTab,
} from './types';
import { createProductHeaderTabs } from './createTabs';

export default function PartTableHeader(props: PartTableHeaderProps) {
    const tabs: PartTableHeaderTab[] = React.useMemo(() => {
        return createProductHeaderTabs(props);
    }, []);

    return (
        <Tabs>
            <TabList>
                {tabs.map(({ title }, index) => (
                    <Tab title={title} key={`PHeadTab-${index}`} />
                ))}
            </TabList>
            <TabPanels>
                {tabs.map(({ component }, index) => (
                    <TabPanel key={`PHeadPanel-${index}`}>{component}</TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
