import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
export declare class AttributeController {
    private readonly attributeService;
    constructor(attributeService: AttributeService);
    create(createAttributeDto: CreateAttributeDto): Promise<import("../../core/entities").Attribute>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Attribute, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Attribute, never>>;
    update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Attribute, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=attribute.controller.d.ts.map