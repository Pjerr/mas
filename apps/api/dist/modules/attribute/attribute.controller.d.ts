import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
export declare class AttributeController {
    private readonly attributeService;
    constructor(attributeService: AttributeService);
    create(createAttributeDto: CreateAttributeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAttributeDto: UpdateAttributeDto): string;
    remove(id: string): string;
}
