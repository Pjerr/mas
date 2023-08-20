import { Attribute } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class AttributeResponse implements EntityResponse<Attribute> {
  data: Attribute;
}

export class AttributesResponse implements EntityResponse<Attribute[]> {
  data: Attribute[];
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
}
