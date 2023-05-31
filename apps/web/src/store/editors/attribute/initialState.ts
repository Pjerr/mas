import { EditorMode } from '../enums';
import { AttributeEditorState } from './types';

export const initialState: AttributeEditorState = {
    mode: EditorMode.None,
    group: null,
};
