import AttributeOption from '@/core/entities/attribute-option';
import { EntityResponse } from '@/core/types';

export class OptionResponse implements EntityResponse<AttributeOption> {
  data: AttributeOption;
  links?: string[];
}

export class OptionsResponse implements EntityResponse<AttributeOption[]> {
  data: AttributeOption[];
  links?: string[];
}
