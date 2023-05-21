import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionController {
    private readonly optionService;
    constructor(optionService: OptionService);
    create(createOptionDto: CreateOptionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOptionDto: UpdateOptionDto): string;
    remove(id: string): string;
}
//# sourceMappingURL=option.controller.d.ts.map