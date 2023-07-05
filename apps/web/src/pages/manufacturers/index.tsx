import AttributeEditor from '@/components/AttributeEditor';
import { useAttributeApi } from '@/hooks/useAttributeApi';
import { useSidebarContext } from '@/hooks/useSidebar';
import { useTable } from '@/hooks/useTable';
import { NextPageWithLayout } from '@/pages/_app';
import { AppDispatch, RootState } from '@/store';
import {
    Manufacturer,
    useCreateManufacturerMutation,
    useUpdateManufacturerMutation,
} from '@/store/api/endpoints';
import React, { useState } from 'react';
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

const Manufacturers: NextPageWithLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loadTableData, clearTableData } = useTable();

    const [updateManufacturer] = useUpdateManufacturerMutation();
    const [createManufacturer] = useCreateManufacturerMutation();

    const { setActiveIndex } = useSidebarContext();

    const editorMode = useSelector(selectManufacturerEditorMode);

    useEffect(() => {
        setActiveIndex(0);
    }, []);

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
        updateManufacturer({
            id,
            updateManufacturer: {
                ...data,
            },
        });
        dispatch(
            setManufacturerEditorState({
                mode: EditorMode.None,
            })
        );
    };

    const handleCreate = (data: Manufacturer) => {
        createManufacturer({ createManufacturer: data });
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
                                view={manufacturerColumnDef as any}
                                instanceId={
                                    instanceIds[EntityType.Manufacturer]
                                }
                                refetch={refetch}
                                showPagination={true}
                                placeholder="There are no manufacturers. Create one!"
                            ></Table>
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
