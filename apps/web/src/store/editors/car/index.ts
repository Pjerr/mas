import { createSlice } from '@reduxjs/toolkit';

export const carSlice = createSlice({
    name: 'car-editor',
    initialState: {},
    reducers: {},
});

export const {} = carSlice.actions;

export * from './selectors';

export default carSlice.reducer;
