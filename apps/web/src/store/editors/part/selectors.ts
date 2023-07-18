import { RootState } from '@/store';

export const selectPartEditor = (state: RootState) => state.partEditor;

export const selectPartForm = (state: RootState) => state.partEditor.form;

export const selectActivePartId = (state: RootState) => {
    if (!state.partEditor.form) return '';
    return state.partEditor.form.value.id;
};

export const selectPartEditorValue = (state: RootState) => {
    return state.partEditor.form?.value;
};

export const selectAttributeConfigPaths = (
    state: RootState,
    partId?: string
) => {
    if (!state.partEditor.form) return;
    const formId = partId ? partId : state.partEditor.form.value.id;
    return state.partEditor.attributePaths[formId];
};
