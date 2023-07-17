import { PartService } from './part.service';
import { UpdatePart } from './dto/requests/update-part.request';
import { BulkUpdatePrice, CreatePart, PartResponse, PartsResponse, QueryPart, UpdateAttributeRelation, UpdateAttributeRelations, UpdateCategoryRelation } from './dto';
export declare class PartController {
    private readonly partService;
    constructor(partService: PartService);
    create(request: CreatePart): Promise<PartResponse>;
    createDraft(): Promise<PartResponse>;
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
}
//# sourceMappingURL=part.controller.d.ts.map