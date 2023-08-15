import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
    AddFieldsAction,
    RemoveFieldsAction,
    SetDraftFormAction,
    SetFormAction,
    UpdateDefaultFormStateAction,
} from './types';
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
            if (!state.form) return;
            state.form.value.attributes.push(...payload.attributes);
        },
        removeFormFields: (
            state,
            { payload }: PayloadAction<RemoveFieldsAction>
        ) => {
            if (!state.form) return;

            const attributePropertyKeys = payload.attributes.map(
                (attribute) => attribute.propertyKey
            );

            const attributeIds = payload.attributes.map((a) => a.id);

            const product = state.form.value;

            const updatedAttributes = product.attributes.filter(
                (attribute) => !attributeIds.includes(attribute.id)
            );

            const updatedProperties = Object.fromEntries(
                Object.entries(product.properties || {}).filter(
                    ([key]) => !attributePropertyKeys.includes(key)
                )
            );

            product.attributes = updatedAttributes;
            product.properties = updatedProperties;
        },
        setDraftForm: (
            state,
            { payload }: PayloadAction<SetDraftFormAction>
        ) => {
            if (!state.form) return;
            const castedValue = castDraft(payload.draftValue);
            state.form.value = castedValue;
        },
        updateDefaultFormValue: (
            state,
            { payload }: PayloadAction<UpdateDefaultFormStateAction>
        ) => {
            if (!state.form) return;
            state.form = {
                state: {
                    ...state.form.state,
                    defaultValues: payload.part,
                },
                value: payload.part,
            };
        },
    },
});

export const {
    removeFormFields,
    resetForm,
    addFormFields,
    setForm,
    updateDefaultFormValue,
    setDraftForm,
} = partSlice.actions;

export * from './selectors';

export default partSlice.reducer;
