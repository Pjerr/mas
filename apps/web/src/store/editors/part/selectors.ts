import { RootState } from '@/store';

export const selectPartEditor = (state: RootState) => state.partEditor;

export const selectPartForm = (state: RootState) => state.partEditor.form;
