import { OptionService } from './option.service';
import { OptionConfig } from '@/core/entities';
import { CreateOption, OptionResponse, QueryOption, OptionsResponse } from '@/modules/attribute/dto/option';
import { FilterOptionConfig } from './dto/option/requests/filter-option-config.request';
import { OptionConfigService } from './option-config.service';
export declare class OptionController {
    private readonly optionService;
    private readonly configService;
    constructor(optionService: OptionService, configService: OptionConfigService);
    create(payload: CreateOption): Promise<OptionResponse>;
    find(query: QueryOption): Promise<OptionsResponse>;
    findOneConfig(id: string): Promise<OptionConfig>;
    findPart(query: FilterOptionConfig): Promise<OptionsResponse>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
}
//# sourceMappingURL=option.controller.d.ts.map