import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Attribute } from '@/core/entities';
export declare class AttributeService {
    private readonly em;
    constructor(em: EntityManager);
    create(createAttributeDto: CreateAttributeDto): Promise<Attribute>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Attribute, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Attribute, never>>;
    update(id: string, updateAttributeDto: UpdateAttributeDto): Promise<import("@mikro-orm/core").Loaded<Attribute, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=attribute.service.d.ts.map