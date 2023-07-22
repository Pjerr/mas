import Checkbox from '@/components/Inputs/Checkbox';
import {
    Attribute,
    AttributeOption,
    Manufacturer,
    Part,
} from '@/store/api/endpoints';
import { ColumnDef } from '@tanstack/react-table';
import { Cell } from '../Cell';
import { EntityType } from '@/store/table/types';
import { EditableCell } from '../EditableCell';

export const optionColumnDef: ColumnDef<AttributeOption, any>[] = [
    {
        id: 'value',
        header: () => 'Value',
        accessorKey: 'value',
        meta: { propertyKey: 'Text' },
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'displayName',
        header: () => 'Display Name',
        accessorKey: 'displayName',
        meta: { displayName: 'Text' },
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
];
export const attributeColumnDef: ColumnDef<Attribute, any>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => <Cell {...{ canExpand: false, row }} />,

        accessorKey: 'id',
        enableSorting: false,
        meta: { propertyKey: 'Text' },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
    {
        id: 'propertyKey',
        header: () => 'Property key',
        accessorKey: 'propertyKey',
        meta: { propertyKey: 'Text' },
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'displayName',
        header: () => 'Display Name',
        accessorKey: 'displayName',
        meta: { displayName: 'Text' },
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'editorType',
        accessorKey: 'editorType',
        header: () => 'Editor Type',
        meta: { editorType: 'Number' },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
];

export const partColumnDef: ColumnDef<Part, any>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => <Cell {...{ canExpand: true, row: row }} />,
        accessorKey: 'id',
        enableSorting: false,
        meta: { propertyKey: 'Text' },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
    {
        id: 'name',
        header: () => 'Name',
        accessorKey: 'name',
        meta: { displayName: 'Text' },
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: () => 'Status',
        meta: { editorType: 'Text' },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
    {
        accessorKey: 'basePrice',
        header: 'Base price',
        meta: { editorType: 'Text' },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
];

export const manufacturerColumnDef: ColumnDef<Manufacturer, any>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: ({ row }) => <Cell {...{ canExpand: true, row: row }} />,
        accessorKey: 'id',
        enableSorting: false,
        meta: { propertyKey: 'Text' },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
    { accessorKey: 'name', header: 'Name' },
];

export const partOptionColumnDef: ColumnDef<AttributeOption, any>[] = [
    {
        id: 'value',
        header: () => 'Value',
        accessorKey: 'value',
        meta: { propertyKey: 'Text' },
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'displayName',
        header: () => 'Display Name',
        accessorKey: 'displayName',
        meta: { displayName: 'Text' },
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'configs.0.price',
        header: () => 'Additional price',
        cell: EditableCell,
        accessorFn: (option: AttributeOption) =>
            option.configs.length > 0 ? option.configs[0].price : 0,
        enableSorting: false,
        meta: { propertyKey: 'Number' },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
];

export const extractColumnDef: Record<EntityType, ColumnDef<any, any>[]> = {
    [EntityType.Attribute]: attributeColumnDef,
    [EntityType.Part]: partColumnDef,
    [EntityType.Option]: optionColumnDef,
    [EntityType.Manufacturer]: manufacturerColumnDef,
    [EntityType.PartOption]: partOptionColumnDef,
};
