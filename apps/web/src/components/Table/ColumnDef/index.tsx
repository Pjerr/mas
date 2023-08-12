import Checkbox from '@/components/Inputs/Checkbox';
import {
    Attribute,
    AttributeOption,
    Manufacturer,
    Part,
    VariantConfigResponse,
    Variants,
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
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'displayName',
        header: () => 'Display Name',
        accessorKey: 'displayName',
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
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
    {
        id: 'propertyKey',
        header: () => 'Property key',
        accessorKey: 'propertyKey',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'displayName',
        header: () => 'Display Name',
        accessorKey: 'displayName',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'editorType',
        accessorKey: 'editorType',
        header: () => 'Editor Type',
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
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
    {
        id: 'name',
        header: () => 'Name',
        accessorKey: 'name',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: () => 'Status',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
    {
        accessorKey: 'basePrice',
        header: 'Base price',
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
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'displayName',
        header: () => 'Display Name',
        accessorKey: 'displayName',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
    },
    {
        id: 'configs.0.price',
        header: () => 'Additional price',
        cell: EditableCell,
        accessorFn: (option: AttributeOption) =>
            option.configs?.length > 0 ? option.configs[0].price : 0,
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
    },
];

export const variantColumnDef: ColumnDef<VariantConfigResponse[], any>[] = [
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
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 2,
        maxSize: 5,
    },
];

export const addVariantColumns = ({ configs, basePrice }: Variants) => {
    variantColumnDef.splice(2, variantColumnDef.length);

    const attributeHeaders = configs[0].map(
        (configExample) => configExample.attributeName
    );

    variantColumnDef.push(
        ...attributeHeaders.map((header, index) => {
            return {
                id: header,
                header: () => header,
                accessorFn: (variant: VariantConfigResponse[]) =>
                    variant[index]?.optionValue,
                minSize: 20,
                maxSize: 50,
            };
        })
    );
    variantColumnDef.push({
        id: 'price',
        header: 'Price',
        accessorFn: (variant: VariantConfigResponse[]) =>
            variant.reduce((acc, current) => acc + current.price, basePrice),
        minSize: 2,
        maxSize: 5,
    });
};

export const extractColumnDef: Record<EntityType, ColumnDef<any, any>[]> = {
    [EntityType.Attribute]: attributeColumnDef,
    [EntityType.Part]: partColumnDef,
    [EntityType.Option]: optionColumnDef,
    [EntityType.Manufacturer]: manufacturerColumnDef,
};
