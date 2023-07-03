import { CreateOption } from './dto/requests/create-option.request';
import { UpdateOption } from './dto/requests/update-option.request';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Attribute, AttributeOption } from '@/core/entities';
import { FilterEntity } from '@/core/types';
export declare class OptionService {
    private readonly em;
    private readonly optionRepository;
    private readonly attributeRepository;
    constructor(em: EntityManager, optionRepository: EntityRepository<AttributeOption>, attributeRepository: EntityRepository<Attribute>);
    create(payload: CreateOption): Promise<AttributeOption>;
    multipleCreate(payloads: CreateOption[]): Promise<AttributeOption[]>;
    find(filters: FilterEntity<AttributeOption>): Promise<import("@mikro-orm/core").Loaded<AttributeOption, any>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<AttributeOption, never>>;
    update(id: string, payload: UpdateOption): Promise<import("@mikro-orm/core").Loaded<AttributeOption, never>>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    updateAttributeRelation(id: string, attribtueId: string): Promise<import("@mikro-orm/core").Loaded<AttributeOption, never>>;
}
//# sourceMappingURL=option.service.d.ts.map