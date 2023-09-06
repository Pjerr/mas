import { Row } from '@tanstack/react-table';
import { PartTableContextMenu } from '../PartTableContextMenu';

export enum ContextMenuType {
    None = 'None',
    Part = 'Part',
}

interface ContextMenuProps {
    rowRef: React.MutableRefObject<HTMLElement | null>;
    row: Row<any>;
}

export const ContextMenuMap: Record<
    ContextMenuType,
    ((props: ContextMenuProps) => React.ReactElement) | null
> = {
    [ContextMenuType.None]: null,
    [ContextMenuType.Part]: PartTableContextMenu,
};
