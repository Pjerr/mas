import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tableReducer from './table/index';
import attributeEditorReducer from './editors/attribute/index';
import partEditorReducer from './editors/part/index';
import manufacturerEditorReducer from './editors/manufacturer/index';
import userReducer from '@/store/user';
import { api } from './api';
import { MasApi } from './api/endpoints';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    table: tableReducer,
    attributeEditor: attributeEditorReducer,
    partEditor: partEditorReducer,
    manufacturerEditor: manufacturerEditorReducer,
    userSlice: userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const enhancedApi = MasApi.enhanceEndpoints({
    endpoints: {
        findPart: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Parts' as const,
                              id,
                          })),
                          { type: 'Parts', id: 'LIST' },
                      ]
                    : [{ type: 'Parts', id: 'LIST' }],
        },
        findAttribute: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Attributes' as const,
                              id,
                          })),
                          { type: 'Attributes', id: 'LIST' },
                      ]
                    : [{ type: 'Attributes', id: 'LIST' }],
        },
        createPart: {
            invalidatesTags: [
                { type: 'Parts', id: 'LIST' },
                { type: 'Variants', id: 'PART_VARIANTS' },
            ],
        },
        updatePart: {
            invalidatesTags: [
                { type: 'Parts', id: 'LIST' },
                { type: 'Variants', id: 'PART_VARIANTS' },
            ],
        },
        createAttribute: {
            invalidatesTags: [{ type: 'Attributes', id: 'LIST' }],
        },
        updateAttribute: {
            invalidatesTags: [{ type: 'Attributes', id: 'LIST' }],
        },
        removeManyAttribute: {
            invalidatesTags: [
                { type: 'Parts', id: 'LIST' },
                { type: 'Attributes', id: 'LIST' },
            ],
        },
        bulkUpdatePricePart: {
            invalidatesTags: [{ type: 'Parts', id: 'LIST' }],
        },
        updateVariantImagePart: {
            invalidatesTags: [{ type: 'Variants', id: 'PART_VARIANTS' }],
        },
        updateGroup: {
            invalidatesTags: [
                { type: 'Groups', id: 'LIST' },
                { type: 'Parts', id: 'LIST' },
            ],
        },
        createGroup: {
            invalidatesTags: [
                { type: 'Groups', id: 'LIST' },
                { type: 'Parts', id: 'LIST' },
            ],
        },
        findVariantsPart: {
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Variants' as const,
                              id,
                          })),
                          { type: 'Variants', id: 'PART_VARIANTS' },
                      ]
                    : [{ type: 'Variants', id: 'PART_VARIANTS' }],
        },
    },
});

export const {
    useCreatePartMutation,
    useUpdatePartMutation,
    useFindAttributeQuery,
    useFindPartQuery,
    useRemoveManyAttributeMutation,
    useCreateAttributeMutation,
    useUpdateAttributeMutation,
} = enhancedApi;
