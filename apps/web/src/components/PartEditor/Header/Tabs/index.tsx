import Tabs from '@/components/Tabs';
import Tab from '@/components/Tabs/Tab';
import TabList from '@/components/Tabs/TabList';
import { PartForm } from '@/store/editors/part/types';

interface HeaderTabsProps {
    form: PartForm;
}

export function HeaderTabs({ form }: HeaderTabsProps) {
    return (
        <Tabs onSelect={() => {}} activeTab={0} setActiveTab={() => {}}>
            <TabList>
                <Tab
                    key={`part-tab`}
                    title={form.state.defaultValues?.name || 'Part'}
                    data-cy="header__tab"
                />
            </TabList>
        </Tabs>
    );
}
