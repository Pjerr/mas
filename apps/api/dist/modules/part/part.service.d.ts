import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePart } from './dto/requests/update-part.request';
export declare class PartService {
    create(createPartDto: CreatePartDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePartDto: UpdatePart): string;
    remove(id: number): string;
}
//# sourceMappingURL=part.service.d.ts.map