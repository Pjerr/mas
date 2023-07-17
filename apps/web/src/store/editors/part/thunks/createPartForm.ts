import { AppDispatch, RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormState } from 'react-hook-form';
import { CreatePartFormAction, PartForm } from '../types';
import { setForm } from '..';
import { Part } from '@/store/api/endpoints';

const createPartForm = createAsyncThunk<
    void,
    CreatePartFormAction,
    { dispatch: AppDispatch; state: RootState }
>('grid/loadData', async ({ part: data }, { dispatch }) => {
    const formState = createFormState(data);

    const form: PartForm = {
        state: formState,
        value: data as Part,
    };

    dispatch(setForm({ form }));
});

const createFormState = (part: Partial<Part>): FormState<Part> => {
    return {
        isDirty: false,
        isValidating: false,
        isLoading: false,
        isSubmitted: false,
        isSubmitting: false,
        isSubmitSuccessful: false,
        isValid: false,
        submitCount: 0,
        dirtyFields: {},
        touchedFields: {},
        errors: {},
        defaultValues: part,
    };
};

export default createPartForm;
