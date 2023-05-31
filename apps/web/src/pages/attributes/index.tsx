import AttributeEditor from '@/components/AttributeEditor';
import Toolbar from '@/components/Toolbar';
import { useSidebarContext } from '@/hooks/useSidebar';
import { useTable } from '@/hooks/useTable';
import { NextPageWithLayout } from '@/pages/_app';
import { AppDispatch, RootState } from '@/store';
import { Attribute } from '@/store/api/endpoints';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import Table from '@/components/Table';
import { instanceIds } from '@/types/entity';
import { EntityType } from '@/store/table/types';
import { PartialGroup } from '@/store/editors/attribute/types';
import {
    selectAttributeEditorMode,
    setAttributeEditorState,
} from '@/store/editors/attribute';
import { selectSelectedRows, selectTableData } from '@/store/table';
import { EditorMode } from '@/store/editors/enums';
import { TableProvider } from '@/components/Table/TableProvider';
import { attributeColumnDef } from '@/components/Table/ColumnDef';
import { SidebarLayout } from '@/layouts/SidebarLayout';
import GroupListbox from '@/components/GroupListbox';
import { useAttributeApi } from '@/hooks/useAttributeApi';

const Attributes: NextPageWithLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loadTableData, clearTableData } = useTable(
        instanceIds[EntityType.Attribute]
    );

    const { updateAttribute: update, createAttribute: create } =
        useAttributeApi();

    const [activeGroup, setActiveGroup] = useState<PartialGroup | null>(null);
    const [listboxEditMode, setListboxEditMode] = useState<boolean>(false);

    const sidebarContext = useSidebarContext();

    const editorMode = useSelector(selectAttributeEditorMode);

    useEffect(() => {
        sidebarContext.addTab({
            id: `groups`,
            title: 'Groups',
            component: () => (
                <GroupListbox
                    listboxEditMode={listboxEditMode}
                    setActiveGroup={setActiveGroup}
                    setListboxEditMode={setListboxEditMode}
                />
            ),
        });
    }, [activeGroup?.id, listboxEditMode]);

    const selectedIds = useSelector((state: RootState) =>
        selectSelectedRows(state, instanceIds[EntityType.Attribute])
    );

    const gridData = useSelector((state: RootState) =>
        selectTableData(state, instanceIds[EntityType.Attribute])
    );

    useEffect(() => {
        if (!activeGroup) {
            clearTableData();
            return;
        }
        loadTableData(EntityType.Attribute, activeGroup.id);
    }, [activeGroup]);

    const refetch = () => {
        if (!activeGroup) return;
        loadTableData(EntityType.Attribute, activeGroup.id);
    };

    const updateAttribute = (data: Attribute, attributeId: string) => {
        if (!activeGroup?.id) return;
        update(data, attributeId, activeGroup.id);
        dispatch(
            setAttributeEditorState({
                group: null,
                mode: EditorMode.None,
            })
        );
    };

    const createAttribute = (data: Attribute) => {
        if (!activeGroup?.id) return;
        create(data, activeGroup.id);
        dispatch(
            setAttributeEditorState({
                group: null,
                mode: EditorMode.None,
            })
        );
    };

    const onEdit = () => {
        if (selectedIds) {
            const entity = gridData?.find(
                (entity) => entity.id === selectedIds[0]
            );
            dispatch(
                setAttributeEditorState({
                    attribute: entity as Attribute,
                    group: activeGroup,
                    mode: EditorMode.Edit,
                })
            );
        }
    };

    const onEditMode = (selected: string[] | undefined): boolean => {
        return selected && selected.length === 1 ? false : true;
    };

    const onCreate = () => {
        dispatch(
            setAttributeEditorState({
                group: activeGroup,
                mode: EditorMode.Create,
            })
        );
    };

    return (
        <div className={styles['attribute__content']}>
            <div className={styles['attribute-grid']}>
                <TableProvider>
                    <Toolbar
                        type={EntityType.Attribute}
                        onEdit={onEdit}
                        onEditMode={onEditMode}
                        onCreate={onCreate}
                    ></Toolbar>
                    {activeGroup ? (
                        <div className={styles['attribute-table']}>
                            <Table
                                view={attributeColumnDef as any}
                                instanceId={instanceIds[EntityType.Attribute]}
                                refetch={refetch}
                                paginate={true}
                                placeholder="Group does not have attributes"
                            ></Table>
                        </div>
                    ) : (
                        <div className={styles['placeholder']}>
                            Select group to show its attributes
                        </div>
                    )}
                </TableProvider>
            </div>
            {editorMode === EditorMode.Edit && (
                <AttributeEditor
                    onCreate={createAttribute}
                    onUpdate={updateAttribute}
                />
            )}
            {editorMode === EditorMode.Create && (
                <AttributeEditor
                    onCreate={createAttribute}
                    onUpdate={updateAttribute}
                />
            )}
        </div>
    );
};

Attributes.getLayout = SidebarLayout;

export default Attributes;
