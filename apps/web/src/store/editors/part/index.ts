import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
    AddAttributePathAction,
    AddFieldsAction,
    RemoveFieldsAction,
    SetDraftFormAction,
    SetFormAction,
    UpdateDefaultFormStateAction,
} from './types';
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
            const product = state.form.value;

            const updatedAttributes = product.attributes.filter(
                (attribute) =>
                    (attribute as Attribute).group.id !== payload.groupId
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
        addAttributePath: (
            state,
            { payload }: PayloadAction<AddAttributePathAction>
        ) => {
            if (!state.attributePaths[payload.partId]) {
                state.attributePaths[payload.partId] = [];
            }

            if (
                !state.attributePaths[payload.partId].find(
                    (path) => path.attributeId === payload.attributeId
                )
            ) {
                state.attributePaths[payload.partId].push({
                    attributeId: payload.attributeId,
                    instanceId: payload.instanceId,
                });
            }
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
    addAttributePath,
} = partSlice.actions;

export * from './selectors';

export default partSlice.reducer;
