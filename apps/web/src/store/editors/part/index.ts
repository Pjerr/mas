import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { AddFieldsAction, RemoveFieldsAction, SetFormAction } from './types';
import { Attribute, Part } from '@/store/api/endpoints';
import { castDraft } from 'immer';

export const partSlice = createSlice({
    name: 'part-editor',
    initialState,
    reducers: {
        resetForm: (state) => {
            state.form = null;
        },
        setForm: (state, { payload }: PayloadAction<SetFormAction>) => {
            const castedForm = castDraft(payload.form);
            state.form = castedForm;
        },
        addFormFields: (state, { payload }: PayloadAction<AddFieldsAction>) => {
            state.form?.state.defaultValues?.attributes?.push(
                ...payload.attributes
            );
        },
        removeFormFields: (
            state,
            { payload }: PayloadAction<RemoveFieldsAction>
        ) => {
            const attributePropertyKeys = payload.attributes.map(
                (attribute) => attribute.propertyKey
            );
            const part = state.form?.state.defaultValues as Part;

            const updatedAttributes = part.attributes.filter(
                (attribute) =>
                    (attribute as Attribute).group.id !== payload.groupId
            );
            const updatedProperties = Object.fromEntries(
                Object.entries(part.properties || {}).filter(
                    ([key]) => !attributePropertyKeys.includes(key)
                )
            );
            part.attributes = updatedAttributes;
            part.properties = updatedProperties;
        },
    },
});

export const { removeFormFields, resetForm, addFormFields, setForm } =
    partSlice.actions;

export * from './selectors';

export default partSlice.reducer;
