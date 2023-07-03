import { OptionService } from './option.service';
import { CreateOption, OptionResponse, QueryOption, OptionsResponse } from '@/modules/attribute/dto/option';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    create(payload: CreateOption): Promise<OptionResponse>;
    find(query: QueryOption): Promise<OptionsResponse>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
}
//# sourceMappingURL=option.controller.d.ts.map