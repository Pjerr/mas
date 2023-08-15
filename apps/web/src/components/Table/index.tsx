import React, { useContext, useEffect } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    ColumnDef,
    SortingState,
    Updater,
    ColumnFiltersState,
    RowSelectionState,
    Row,
} from '@tanstack/react-table';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { TableContext } from './types/table-context';
import {
    initTable,
    selectTableState,
    setColumnFilters,
    setRowSelection,
    setSorting,
} from '@/store/table';
import uuid4 from 'uuid4';
import { fuzzyFilter } from './types/filters';
import { TableHeader } from './TableHeader';
import TableBody from './TableBody';
import { Pagination } from './Pagination';

interface TableProps {
    view: ColumnDef<any, any>[];
    refetch: () => void;
    instanceId?: string;
    showPagination?: boolean;
    placeholder: string;
    onRowDoubleClick?: (row: Row<any>) => void;
}

function Table({
    view,
    refetch,
    instanceId = uuid4(),
    showPagination: paginate,
    placeholder,
    onRowDoubleClick,
}: TableProps) {
    const { refreshRefs, getInstance, addInstance } = useContext(TableContext);
    const dispatch = useDispatch<AppDispatch>();
    const tableState = useSelector((state: RootState) =>
        selectTableState(state, instanceId)
    );

    const handleSortingChange = (updater: Updater<SortingState>) => {
        if (!tableState) return;

        const current =
            updater instanceof Function ? updater(tableState.sorting) : updater;
        dispatch(
            setSorting({
                sortingState: current,
                instanceId,
            })
        );
        refetch();
    };

    const handleFiltersChange = (updater: Updater<ColumnFiltersState>) => {
        if (!tableState) return;

        const current =
            updater instanceof Function
                ? updater(tableState.columnFilters)
                : updater;
        dispatch(
            setColumnFilters({
                columnFilters: current,
                instanceId,
            })
        );
        refetch();
    };

    const handleRowSelectionChange = (updater: Updater<RowSelectionState>) => {
        if (!tableState) return;

        const current =
            updater instanceof Function
                ? updater(tableState.rowSelection)
                : updater;
        dispatch(
            setRowSelection({
                rowSelection: current,
                instanceId,
            })
        );
        refetch();
    };

    const table = useReactTable<any>({
        data: tableState && tableState.data,
        columns: view,
        filterFns: { fuzzy: fuzzyFilter },
        state: {
            sorting: tableState && tableState.sorting,
            columnFilters: tableState && tableState.columnFilters,
            rowSelection: tableState && tableState.rowSelection,
        },
        columnResizeMode: 'onChange',
        getSubRows: (row) => row.subRows,
        onColumnFiltersChange: handleFiltersChange,
        onSortingChange: handleSortingChange,
        onRowSelectionChange: handleRowSelectionChange,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),

        manualSorting: true,
        enableRowSelection: true,
        manualFiltering: true,
        enableMultiSort: false,
        enableExpanding: true,
        manualExpanding: true,
    });

    useEffect(() => {
        refreshRefs();
    }, [tableState]);

    useEffect(() => {
        dispatch(initTable(instanceId));
        addInstance(instanceId, table);
    }, []);

    if (!getInstance(instanceId)) {
        return <></>;
    }

    if (!tableState.data.length) {
        return <div className={styles['placeholder']}>{placeholder}</div>;
    }

    return (
        <div className={styles['grid-container']}>
            <table className={styles['table']}>
                <TableHeader instanceId={instanceId} />
                <TableBody
                    instanceId={instanceId}
                    onRowDoubleClick={onRowDoubleClick}
                />
            </table>
            {paginate && <Pagination instanceId={instanceId} />}
        </div>
    );
}

export default Table;
