import { useTable } from '@/hooks/useTable';
import { NextPageWithLayout } from '@/pages/_app';
import { AppDispatch, RootState } from '@/store';
import {
    Manufacturer,
    useCreateManufacturerMutation,
    useUpdateManufacturerMutation,
} from '@/store/api/endpoints';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import { instanceIds } from '@/types/entity';
import { EntityType } from '@/store/table/types';
import { selectTableData } from '@/store/table';
import { EditorMode } from '@/store/editors/enums';
import { TableProvider } from '@/components/Table/TableProvider';
import Toolbar from '@/components/Toolbar';
import Table from '@/components/Table';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import {
    selectManufacturerEditorMode,
    setManufacturerEditorState,
} from '@/store/editors/manufacturer';
import ManufacturerEditor from '@/components/ManufacturerEditor';
import { manufacturerColumnDef } from '@/components/Table/ColumnDef';
import { useManufacturerApi } from '@/hooks/useManufacturerApi';
import { Row } from '@tanstack/react-table';

const Manufacturers: NextPageWithLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loadTableData } = useTable();

    const { createManufacturer, updateManufacturer } = useManufacturerApi();

    const editorMode = useSelector(selectManufacturerEditorMode);

    const gridData = useSelector((state: RootState) =>
        selectTableData(state, instanceIds[EntityType.Manufacturer])
    );

    useEffect(() => {
        loadTableData(EntityType.Manufacturer);
    }, []);

    const refetch = () => {
        loadTableData(EntityType.Manufacturer);
    };

    const handleUpdate = (data: Manufacturer, id: string) => {
        updateManufacturer(data, id);
        dispatch(
            setManufacturerEditorState({
                mode: EditorMode.None,
            })
        );
    };

    const handleCreate = (data: Manufacturer) => {
        createManufacturer(data);
        dispatch(
            setManufacturerEditorState({
                mode: EditorMode.None,
            })
        );
    };

    const onEdit = (selectedIds: string[] | undefined) => {
        if (!selectedIds) return;
        const entity = gridData?.find((entity) => entity.id === selectedIds[0]);
        dispatch(
            setManufacturerEditorState({
                manufacturer: entity as Manufacturer,
                mode: EditorMode.Edit,
            })
        );
    };

    const onEditMode = (selected: string[] | undefined): boolean => {
        return selected && selected.length === 1 ? false : true;
    };

    const onCreate = () => {
        dispatch(
            setManufacturerEditorState({
                mode: EditorMode.Create,
            })
        );
    };

    const onRowDoubleClick = (row: Row<any>) => {
        const selectedId: string[] = [
            row.getAllCells()[0].getValue() as string,
        ];
        onEdit(selectedId);
    };

    return (
        <>
            <div className={styles['manufacturer__content']}>
                <div className={styles['manufacturer-grid']}>
                    <TableProvider>
                        <div className={styles['grid__toolbar']}>
                            <Toolbar
                                type={EntityType.Manufacturer}
                                onEdit={onEdit}
                                onEditMode={onEditMode}
                                onCreate={onCreate}
                            ></Toolbar>
                        </div>
                        <div className={styles['manufacturer-table']}>
                            <Table
                                view={manufacturerColumnDef}
                                instanceId={
                                    instanceIds[EntityType.Manufacturer]
                                }
                                refetch={refetch}
                                showPagination={true}
                                placeholder="There are no manufacturers. Create one!"
                                onRowDoubleClick={onRowDoubleClick}
                            />
                        </div>
                    </TableProvider>
                </div>
                {editorMode === EditorMode.Edit && (
                    <ManufacturerEditor
                        onCreate={handleCreate}
                        onUpdate={handleUpdate}
                    />
                )}
                {editorMode === EditorMode.Create && (
                    <ManufacturerEditor
                        onCreate={handleCreate}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </>
    );
};

Manufacturers.getLayout = SidebarLayout;

export default Manufacturers;
