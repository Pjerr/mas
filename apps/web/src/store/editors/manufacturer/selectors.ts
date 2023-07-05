import { RootState } from '@/store';

export const selectManufacturerEditor = (state: RootState) =>
    state.manufacturerEditor;

export const selectManufacturer = (state: RootState) =>
    state.manufacturerEditor.manufacturer;

export const selectManufacturerEditorMode = (state: RootState) =>
    state.manufacturerEditor.mode;
