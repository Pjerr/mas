import Toolbar from '@/components/Toolbar';
import { PartTableHeaderProps, PartTableHeaderTab } from './types';
import { EntityType } from '@/store/table/types';

export const createProductHeaderTabs = (
    props: PartTableHeaderProps
): PartTableHeaderTab[] => {
    return [
        {
            title: 'Home',
            component: (
                <Toolbar type={EntityType.Part} {...props.toolbarProps} />
            ),
        },
        {
            title: 'Bulk actions',
            component: <>I am bulk action component</>,
        },
    ];
};
