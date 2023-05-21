import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    create(createOptionDto: CreateOptionDto): Promise<import("../../core/entities/attribute-option").default>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities/attribute-option").default, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities/attribute-option").default, never>>;
    update(id: string, updateOptionDto: UpdateOptionDto): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities/attribute-option").default, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=option.controller.d.ts.map