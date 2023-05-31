import { createSlice } from '@reduxjs/toolkit';

export const partSlice = createSlice({
    name: 'part-editor',
    initialState: {},
    reducers: {},
});

export const {} = partSlice.actions;

export * from './selectors';

export default partSlice.reducer;
