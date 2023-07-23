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

export const selectFormAttributes = (state: RootState) => {
    return state.partEditor.form?.value.attributes;
};
