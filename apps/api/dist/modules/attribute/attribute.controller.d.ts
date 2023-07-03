import { AttributeService } from '@/modules/attribute/attribute.service';
import { CreateAttribute, QueryAttribute, UpdateAttribute } from '@/modules/attribute/dto/attribute';
import { AttributeResponse, AttributesResponse, PartialAttributesResponse } from '@/modules/attribute/dto/attribute/attribute.response';
export declare class AttributeController {
    private readonly attributeService;
    constructor(attributeService: AttributeService);
    create(payload: CreateAttribute): Promise<AttributeResponse>;
    find(query: QueryAttribute): Promise<AttributesResponse>;
    findOne(id: string): Promise<AttributeResponse>;
    findByProduct(productId: string): Promise<PartialAttributesResponse>;
    update(id: string, payload: UpdateAttribute): Promise<AttributeResponse>;
    removeMany(ids: string[]): Promise<void>;
}
//# sourceMappingURL=attribute.controller.d.ts.map