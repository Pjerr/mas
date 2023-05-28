import { Attribute } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class AttributeResponse implements EntityResponse<Attribute> {
  data: Attribute;
  links?: string[];
}

class AttributeByCar {
  id: string;
  propertyKey: string;
  displayName: string;
}

export class PartialAttributesResponse
  implements EntityResponse<AttributeByCar[]>
{
  data: AttributeByCar[];
  links?: string[];
}

export class AttributesResponse implements EntityResponse<Attribute[]> {
  data: Attribute[];
  links?: string[];
}
