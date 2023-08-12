import { OptionConfig, Part } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class PartResponse implements EntityResponse<Part> {
  data: Part;
  variantConfigs?: OptionConfig[][];
  links?: string[];
}

export class PartsResponse implements EntityResponse<Part[]> {
  data: Part[];
  links?: string[];
}
