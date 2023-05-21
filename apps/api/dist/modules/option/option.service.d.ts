import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
export declare class OptionService {
    create(createOptionDto: CreateOptionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOptionDto: UpdateOptionDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=option.service.d.ts.map