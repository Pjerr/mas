import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ManufacturerEditorAction, ManufacturerEditorState } from './types';
import { initialState } from './initialState';

export const manufacturerEditorSlice = createSlice({
    name: 'manufacturer-editor',
    initialState,
    reducers: {
        setManufacturerEditorState: (
            state,
            { payload }: PayloadAction<ManufacturerEditorState>
        ) => {
            state.manufacturer = payload.manufacturer;
            state.mode = payload.mode;
        },
        setManufacturerEditorEntity: (
            state,
            { payload }: PayloadAction<ManufacturerEditorAction>
        ) => {
            state.manufacturer = payload.manufacturer;
        },
    },
});

export const { setManufacturerEditorEntity, setManufacturerEditorState } =
    manufacturerEditorSlice.actions;

export * from './selectors';

export default manufacturerEditorSlice.reducer;
