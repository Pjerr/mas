import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
export declare class AttributeService {
    create(createAttributeDto: CreateAttributeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAttributeDto: UpdateAttributeDto): string;
    remove(id: string): string;
}
//# sourceMappingURL=attribute.service.d.ts.map