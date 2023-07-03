import { CreateOption } from './dto/requests/create-option.request';
import { UpdateOption } from './dto/requests/update-option.request';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import AttributeOption from '@/core/entities/attribute-option.entity';
import { Attribute } from '@/core/entities';
import { FilterEntity } from '@/core/types';
export declare class OptionService {
    private readonly em;
    private readonly optionRepository;
    private readonly attributeRepository;
    constructor(em: EntityManager, optionRepository: EntityRepository<AttributeOption>, attributeRepository: EntityRepository<Attribute>);
    create(payload: CreateOption): Promise<AttributeOption>;
    multipleCreate(payloads: CreateOption[]): Promise<AttributeOption[]>;
    find(filters: FilterEntity<AttributeOption>): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, payload: UpdateOption): Promise<any>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    updateAttributeRelation(id: string, attribtueId: string): Promise<any>;
}
//# sourceMappingURL=option.service.d.ts.map