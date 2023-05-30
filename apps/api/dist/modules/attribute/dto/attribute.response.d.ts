import { Attribute } from '@/core/entities';
import { EntityResponse } from '@/core/types';
export declare class AttributeResponse implements EntityResponse<Attribute> {
    data: Attribute;
    links?: string[];
}
declare class AttributeByCar {
    id: string;
    propertyKey: string;
    displayName: string;
}
export declare class PartialAttributesResponse implements EntityResponse<AttributeByCar[]> {
    data: AttributeByCar[];
    links?: string[];
}
export declare class AttributesResponse implements EntityResponse<Attribute[]> {
    data: Attribute[];
    links?: string[];
}
export {};
//# sourceMappingURL=attribute.response.d.ts.map