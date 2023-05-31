import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tableReducer from './table/index';
import attributeEditorReducer from './editors/attribute/index';
import partEditorReducer from './editors/part/index';
import { api } from './api';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    table: tableReducer,
    attributeEditor: attributeEditorReducer,
    partEditor: partEditorReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
