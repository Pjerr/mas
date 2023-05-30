import { AttributeService } from '@/modules/attribute/attribute.service';
import { CreateAttribute, QueryAttribtue, UpdateAttribute } from '@/modules/attribute/dto';
import { AttributeResponse, AttributesResponse, PartialAttributesResponse } from '@/modules/attribute/dto/attribute.response';
export declare class AttributeController {
    private readonly attributeService;
    constructor(attributeService: AttributeService);
    create(payload: CreateAttribute): Promise<AttributeResponse>;
    find(query: QueryAttribtue): Promise<AttributesResponse>;
    findOne(id: string): Promise<AttributeResponse>;
    findByPart(partId: string): Promise<PartialAttributesResponse>;
    update(id: string, payload: UpdateAttribute): Promise<AttributeResponse>;
    removeMany(ids: string[]): Promise<void>;
}
//# sourceMappingURL=attribute.controller.d.ts.map