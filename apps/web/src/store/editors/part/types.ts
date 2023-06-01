import { Attribute, Part } from '@/store/api/endpoints';
import { FormState } from 'react-hook-form';

export interface PartEditorState {
    form: PartForm | null;
}

export interface PartForm {
    state: FormState<Part>;
}
export interface CreatePartFormAction {
    part: Partial<Part>;
}

export interface SetFormAction {
    form: PartForm;
}
export interface SetFormGroupsAction {
    attributes: Attribute[];
}

export interface RemoveFieldsAction {
    groupId: string;
    attributes: Attribute[];
}

export interface AddFieldsAction {
    attributes: Attribute[];
}
