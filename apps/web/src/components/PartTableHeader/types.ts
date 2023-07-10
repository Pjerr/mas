import { EntityType } from '@/store/table/types';

export interface PartTableHeaderProps {
    toolbarProps: ToolbarProps;
    bulkActionProps: BulkActionProps;
}
export interface ToolbarProps {
    onCreate: () => void;
    onEdit: (selected: string[] | undefined) => void;
    onEditMode: (selected: string[] | undefined) => boolean;
}

export interface BulkActionProps {
    type: EntityType;
    selectedIds: string[] | undefined;
    onUpdate: (selectedIds: string[]) => void;
}
export interface PartTableHeaderTab {
    title: string;
    component: React.ReactNode;
}
