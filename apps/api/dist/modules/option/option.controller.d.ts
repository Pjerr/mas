import { OptionService } from './option.service';
import { CreateOption } from './dto/requests/create-option.request';
import { UpdateOption } from './dto/requests/update-option.request';
import { OptionResponse, OptionsResponse, QueryOption, UpdateAttributeRelation } from './dto';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    create(payload: CreateOption): Promise<OptionResponse>;
    find(query: QueryOption): Promise<OptionsResponse>;
    findOne(id: string): Promise<OptionResponse>;
    update(id: string, payload: UpdateOption): Promise<OptionResponse>;
    remove(id: string): Promise<void>;
    updateRelation(id: string, payload: UpdateAttributeRelation): Promise<OptionResponse>;
    removeMany(ids: string[]): Promise<void>;
}
//# sourceMappingURL=option.controller.d.ts.map