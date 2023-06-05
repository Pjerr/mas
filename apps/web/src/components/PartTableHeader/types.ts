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
    name: string;
}
export interface PartTableHeaderTab {
    title: string;
    component: React.ReactNode;
}
