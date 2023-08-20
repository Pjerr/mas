import { Attribute } from '@/core/entities';
import { EntityResponse } from '@/core/types';
export declare class AttributeResponse implements EntityResponse<Attribute> {
    data: Attribute;
}
export declare class AttributesResponse implements EntityResponse<Attribute[]> {
    data: Attribute[];
}
declare class AttributeByPart {
    id: string;
    propertyKey: string;
    displayName: string;
}
export declare class PartialAttributesResponse implements EntityResponse<AttributeByPart[]> {
    data: AttributeByPart[];
}
export {};
//# sourceMappingURL=attribute.response.d.ts.map