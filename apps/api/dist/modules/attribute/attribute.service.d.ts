import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
export declare class AttributeService {
    create(createAttributeDto: CreateAttributeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAttributeDto: UpdateAttributeDto): string;
    remove(id: number): string;
}
