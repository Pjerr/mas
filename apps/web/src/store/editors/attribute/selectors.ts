import { RootState } from '@/store';

export const selectAttributeEditor = (state: RootState) =>
    state.attributeEditor;

export const selectAttribute = (state: RootState) =>
    state.attributeEditor.attribute;

export const selectAttributeGroup = (state: RootState) =>
    state.attributeEditor.group;

export const selectAttributeEditorMode = (state: RootState) =>
    state.attributeEditor.mode;
