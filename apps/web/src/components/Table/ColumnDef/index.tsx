import Checkbox from '@/components/Inputs/Checkbox';
import {
    Attribute,
    AttributeOption,
    Manufacturer,
    Part,
    Variant,
} from '@/store/api/endpoints';
import { ColumnDef } from '@tanstack/react-table';
import { SelectCell } from '../CustomCells/SelectCell';
import { EntityType } from '@/store/table/types';
import { EditableCell } from '../EditableCell';
import { ImageCell } from '../CustomCells/ImageCell';

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
        cell: ({ row }) => <SelectCell {...{ canExpand: false, row }} />,

        accessorKey: 'id',
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 2,
        maxSize: 5,
    },
    {
        id: 'propertyKey',
        header: () => 'Property key',
        accessorKey: 'propertyKey',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
        minSize: 20,
        maxSize: 30,
    },
    {
        id: 'displayName',
        header: () => 'Display Name',
        accessorKey: 'displayName',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
        minSize: 20,
        maxSize: 30,
    },
    {
        id: 'editorType',
        accessorKey: 'editorType',
        header: () => 'Editor Type',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 20,
        maxSize: 30,
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
        cell: ({ row }) => <SelectCell {...{ canExpand: true, row: row }} />,
        accessorKey: 'id',
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 2,
        maxSize: 5,
    },
    {
        id: 'name',
        header: () => 'Name',
        accessorKey: 'name',
        enableColumnFilter: true,
        enableGlobalFilter: true,
        enableResizing: true,
        minSize: 50,
        maxSize: 70,
    },
    {
        accessorKey: 'basePrice',
        header: 'Base price',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 20,
        maxSize: 40,
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: () => 'Status',
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 20,
        maxSize: 40,
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
        cell: ({ row }) => <SelectCell {...{ canExpand: true, row: row }} />,
        accessorKey: 'id',
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 2,
        maxSize: 5,
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

export const variantColumnDef: ColumnDef<Variant, any>[] = [
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
        cell: ({ row }) => <SelectCell {...{ canExpand: false, row }} />,
        accessorKey: 'id',
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: false,
        minSize: 2,
        maxSize: 5,
    },
    {
        id: 'image',
        header: 'Image',
        cell: ImageCell,
        enableSorting: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: false,
        minSize: 10,
        maxSize: 30,
    },
];

interface VariantConfig {
    optionValue: string;
    attributeName: string;
}

export const addVariantColumns = (variants: Variant[]) => {
    variantColumnDef.splice(2, variantColumnDef.length);

    const configs: VariantConfig[][] = variants.map((variant) => {
        const variantConfigs: VariantConfig[] = Object.values(
            variant.properties
        ).map((config) => {
            const result = Object.keys(config).map((key) => ({
                key,
                value: config[key],
            }))[0];

            return {
                attributeName: result.key,
                optionValue: result.value,
            };
        });
        return variantConfigs;
    });

    const attributeHeaders = configs[0].map((config) => config.attributeName);

    variantColumnDef.push(
        ...attributeHeaders.map((header, index) => {
            return {
                id: header,
                header: () => header,
                accessorFn: (variant: Variant) => {
                    return (variant.properties as [])[index][header];
                },
                minSize: 20,
                maxSize: 30,
            };
        })
    );

    variantColumnDef.push({
        header: 'Total price',
        accessorKey: 'price',
        enableSorting: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 20,
        maxSize: 30,
    });

    variantColumnDef.push({
        header: 'Disabled',
        accessorKey: 'disabled',
        enableSorting: true,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableResizing: true,
        minSize: 20,
        maxSize: 30,
    });

    variantColumnDef.push({
        header: 'Has image',
        accessorKey: 'imageUploaded',
    });
};

export const extractColumnDef: Record<EntityType, ColumnDef<any, any>[]> = {
    [EntityType.Attribute]: attributeColumnDef,
    [EntityType.Part]: partColumnDef,
    [EntityType.Option]: optionColumnDef,
    [EntityType.Manufacturer]: manufacturerColumnDef,
};
