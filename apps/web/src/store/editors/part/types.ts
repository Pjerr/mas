import { Attribute, Part } from '@/store/api/endpoints';
import { FormState } from 'react-hook-form';

export interface PartEditorState {
    form: PartForm | null;
    attributePaths: Record<string, AttributePath[]>;
}

export interface AttributePath {
    attributeId: string;
    instanceId: string;
}
export interface PartForm {
    state: FormState<Part>;
    value: Part;
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

export interface AddAttributePath {
    partId: string;
    attributeId: string;
    instanceId: string;
}

export interface UpdateDefaultFormStateAction {
    part: Part;
}

export interface SetDraftFormAction {
    draftValue: Part;
}

export interface AddAttributePathAction {
    partId: string;
    attributeId: string;
    instanceId: string;
}
