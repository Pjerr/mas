import { Manufacturer } from '@/store/api/endpoints';
import { EditorMode } from '../enums';

export interface ManufacturerEditorState {
    manufacturer?: Manufacturer;
    mode: EditorMode;
}

export interface ManufacturerEditorAction {
    manufacturer?: Manufacturer;
}
