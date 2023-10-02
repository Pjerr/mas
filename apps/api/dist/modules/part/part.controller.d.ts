import { PartService } from './part.service';
import { UpdatePart } from './dto/requests/update-part.request';
import { BulkUpdatePrice, CreateDraft, CreatePart, CreateVariant, PartResponse, PartsResponse, QueryPart, UpdateAttributeRelation, UpdateAttributeRelations, UpdateVariant, UpdateVariantImage, VariantResponse, VariantsResponse } from './dto';
import { VariantService } from './variant.service';
import { QueryVariant } from './dto/requests/filter-variants.request';
import { ToggleVariant as ToggleVariants } from './dto/requests/toggle-variant.request';
import { CloudinaryService } from 'nestjs-cloudinary';
export declare class PartController {
    private readonly partService;
    private readonly variantService;
    private readonly cloudinaryService;
    constructor(partService: PartService, variantService: VariantService, cloudinaryService: CloudinaryService);
    create(request: CreatePart): Promise<PartResponse>;
    createDraft(request: CreateDraft): Promise<PartResponse>;
    findVariants(query: QueryVariant): Promise<VariantsResponse>;
    find(query: QueryPart): Promise<PartsResponse>;
    findOne(id: string): Promise<PartResponse>;
    bulkUpdatePrice(ids: string[], request: BulkUpdatePrice): Promise<PartsResponse>;
    deleteVariantImage(publicId: string): Promise<VariantResponse>;
    update(id: string, payload: UpdatePart): Promise<PartResponse>;
    addAttribute(id: string, payload: UpdateAttributeRelation): Promise<PartResponse>;
    removeAttribute(id: string, payload: UpdateAttributeRelation): Promise<PartResponse>;
    removeAttributes(id: string, payload: UpdateAttributeRelations): Promise<PartResponse>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    createVariants(payload: CreateVariant): Promise<VariantsResponse>;
    toggleVariants(payload: ToggleVariants): Promise<VariantsResponse>;
    updateVariants(payload: UpdateVariant): Promise<VariantsResponse>;
    updateVariantImage(payload: UpdateVariantImage): Promise<VariantResponse>;
}
//# sourceMappingURL=part.controller.d.ts.map