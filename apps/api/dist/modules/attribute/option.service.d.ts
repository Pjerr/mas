import { Attribute, AttributeOption } from '@/core/entities';
import { FilterEntity } from '@/core/types';
import { CreateOption, UpdateOption } from '@/modules/attribute/dto/option';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { FilterOptionConfig } from './dto/option/requests/filter-option-config.request';
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
    updateAttributeRelation(id: string, attributeId: string): Promise<import("@mikro-orm/core").Loaded<AttributeOption, never>>;
    findPartOptions(request: FilterOptionConfig): Promise<import("@mikro-orm/core").Loaded<AttributeOption, "configs">[]>;
}
//# sourceMappingURL=option.service.d.ts.map