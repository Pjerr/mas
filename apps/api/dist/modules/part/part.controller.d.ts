import { PartService } from './part.service';
import { UpdatePart } from './dto/requests/update-part.request';
import { BulkUpdatePrice, CreateDraft, CreatePart, CreateVariant, PartResponse, PartsResponse, QueryPart, UpdateAttributeRelation, UpdateAttributeRelations, UpdateCategoryRelation, VariantsResponse } from './dto';
import { VariantService } from './variant.service';
import { QueryVariant } from './dto/requests/filter-variants.request';
import { Variant } from '@/core/entities/variant.entity';
export declare class PartController {
    private readonly partService;
    private readonly variantService;
    constructor(partService: PartService, variantService: VariantService);
    create(request: CreatePart): Promise<PartResponse>;
    createDraft(request: CreateDraft): Promise<PartResponse>;
    findVariants(query: QueryVariant): Promise<VariantsResponse>;
    find(query: QueryPart): Promise<PartsResponse>;
    findOne(id: string): Promise<PartResponse>;
    bulkUpdatePrice(ids: string[], request: BulkUpdatePrice): Promise<PartsResponse>;
    update(id: string, payload: UpdatePart): Promise<PartResponse>;
    addCategory(id: string, payload: UpdateCategoryRelation): Promise<PartResponse>;
    addAttribute(id: string, payload: UpdateAttributeRelation): Promise<PartResponse>;
    removeAttribute(id: string, payload: UpdateAttributeRelation): Promise<PartResponse>;
    removeAttributes(id: string, payload: UpdateAttributeRelations): Promise<PartResponse>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    createVariants(payload: CreateVariant): Promise<{
        data: Variant[];
    }>;
}
//# sourceMappingURL=part.controller.d.ts.map