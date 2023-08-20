import { AttributeOption } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class OptionResponse implements EntityResponse<AttributeOption> {
  data: AttributeOption;
}

export class OptionsResponse implements EntityResponse<AttributeOption[]> {
  data: AttributeOption[];
}
