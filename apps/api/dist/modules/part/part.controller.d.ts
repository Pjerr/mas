import { PartService } from './part.service';
import { UpdatePart } from './dto/requests/update-part.request';
import { BulkUpdatePrice, CreatePart, MultipleUpdatePart, PartResponse, PartsResponse, QueryPart, UpdateAttributeRelation, UpdateAttributeRelations, UpdateCategoryRelation } from './dto';
export declare class PartController {
    private readonly partService;
    constructor(partService: PartService);
    create(payload: CreatePart): Promise<PartResponse>;
    find(query: QueryPart): Promise<PartsResponse>;
    findOne(id: string): Promise<PartResponse>;
    update(id: string, payload: UpdatePart): Promise<PartResponse>;
    multipleUpdate(ids: string[], request: MultipleUpdatePart): Promise<PartsResponse>;
    bulkUpdatePrice(ids: string[], request: BulkUpdatePrice): Promise<PartsResponse>;
    addCategory(id: string, payload: UpdateCategoryRelation): Promise<PartResponse>;
    addAttribute(id: string, payload: UpdateAttributeRelation): Promise<PartResponse>;
    removeAttribute(id: string, payload: UpdateAttributeRelation): Promise<PartResponse>;
    removeAttributes(id: string, payload: UpdateAttributeRelations): Promise<PartResponse>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
}
//# sourceMappingURL=part.controller.d.ts.map