import { Attribute, Group } from '@/store/api/endpoints';
import { Optional } from '@/types/utils';
import { EditorMode } from '../enums';

export type PartialGroup = Optional<Group, keyof Omit<Group, 'name'>>;
export interface AttributeEditorState {
    attribute?: Attribute;
    group: PartialGroup | null;
    mode: EditorMode;
}

export interface AttributeEditorAction {
    attribute?: Attribute;
}
