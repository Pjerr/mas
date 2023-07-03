import { Attribute } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class AttributeResponse implements EntityResponse<Attribute> {
  data: Attribute;
  links?: string[];
}

export class AttributesResponse implements EntityResponse<Attribute[]> {
  data: Attribute[];
  links?: string[];
}
class AttributeByPart {
  id: string;
  propertyKey: string;
  displayName: string;
}

export class PartialAttributesResponse
  implements EntityResponse<AttributeByPart[]>
{
  data: AttributeByPart[];
  links?: string[];
}
