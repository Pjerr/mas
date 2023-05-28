import { createSlice } from '@reduxjs/toolkit';

export const attributeEditorSlice = createSlice({
    name: 'attribute-editor',
    initialState: {},
    reducers: {},
});

export const {} = attributeEditorSlice.actions;

export * from './selectors';

export default attributeEditorSlice.reducer;
