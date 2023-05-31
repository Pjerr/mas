import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { AttributeEditorAction, AttributeEditorState } from './types';

export const attributeEditorSlice = createSlice({
    name: 'attribute-editor',
    initialState,
    reducers: {
        setAttributeEditorState: (
            state,
            { payload }: PayloadAction<AttributeEditorState>
        ) => {
            state.attribute = payload.attribute;
            state.group = payload.group;
            state.mode = payload.mode;
        },
        setAttributeEditorEntity: (
            state,
            { payload }: PayloadAction<AttributeEditorAction>
        ) => {
            state.attribute = payload.attribute;
        },
    },
});

export const { setAttributeEditorEntity, setAttributeEditorState } =
    attributeEditorSlice.actions;

export * from './selectors';

export default attributeEditorSlice.reducer;
