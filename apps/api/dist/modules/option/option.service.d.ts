import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import AttributeOption from '@/core/entities/attribute-option';
export declare class OptionService {
    private readonly em;
    constructor(em: EntityManager);
    create(createOptionDto: CreateOptionDto): Promise<AttributeOption>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<AttributeOption, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<AttributeOption, never>>;
    update(id: string, updateOptionDto: UpdateOptionDto): Promise<import("@mikro-orm/core").Loaded<AttributeOption, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=option.service.d.ts.map