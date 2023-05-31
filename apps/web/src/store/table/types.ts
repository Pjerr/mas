import { BaseEntity } from '@/types/entity';
import {
    ColumnFiltersState,
    RowSelectionState,
    SortingState,
} from '@tanstack/react-table';
import { EditorMode } from '../editors/enums';

export enum EntityType {
    Attribute = 'Attribute',
    Part = 'Part',
    Option = 'Option',
}

export interface TableInstance {
    data: BaseEntity[];
    isError: boolean;
    isLoading: boolean;
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    rowSelection: Record<string, boolean>;
}

export const initialInstance: TableInstance = {
    data: [],
    isError: false,
    isLoading: false,
    sorting: [],
    columnFilters: [],
    rowSelection: {},
};

export interface LoadDataAction {
    instanceId: string;
    data: BaseEntity[];
    isError: boolean;
    isLoading: boolean;
}

export interface RefreshStateAction {
    instanceId: string;
}

export interface RemoveManyAction {
    instanceId: string;
    ids: string[];
}

export interface EntityAction {
    instanceId: string;
    entity: BaseEntity;
}

export interface EditAction {
    entity: BaseEntity | null;
    mode: EditorMode;
}

export interface SortingAction {
    instanceId: string;
    sortingState: SortingState;
}

export interface ColumnFiltersAction {
    instanceId: string;
    columnFilters: ColumnFiltersState;
}

export interface RowSeletctionAction {
    instanceId: string;
    rowSelection: RowSelectionState;
}

export const includeArgMap: Record<EntityType, string[]> = {
    [EntityType.Attribute]: ['options'],
    [EntityType.Part]: [],
    [EntityType.Option]: [],
};
