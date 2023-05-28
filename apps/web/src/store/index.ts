import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tableReducer from './table/index';
import attributeEditorReducer from './editors/attribute/index';
import carEditorReducer from './editors/car/index';

const rootReducer = combineReducers({
    table: tableReducer,
    attributeEditor: attributeEditorReducer,
    carEditor: carEditorReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
