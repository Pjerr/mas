import Toolbar from '@/components/Toolbar';
import { PartTableHeaderProps, PartTableHeaderTab } from './types';
import { EntityType } from '@/store/table/types';
import BulkActionToolbar from '../BulkActionToolbar';

export const createPartHeaderTabs = (
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
            component: <BulkActionToolbar {...props.bulkActionProps} />,
        },
    ];
};
