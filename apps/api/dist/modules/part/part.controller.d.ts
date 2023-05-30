import { PartService } from './part.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePart } from './dto/requests/update-part.request';
export declare class PartController {
    private readonly partService;
    constructor(partService: PartService);
    create(createPartDto: CreatePartDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePartDto: UpdatePart): string;
    remove(id: string): string;
}
//# sourceMappingURL=part.controller.d.ts.map