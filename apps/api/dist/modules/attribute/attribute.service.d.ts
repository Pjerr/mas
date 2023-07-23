import { Attribute, Group, Part } from '@/core/entities';
import { FilterEntity } from '@/core/types';
import { CreateAttribute, UpdateAttribute } from '@/modules/attribute/dto/attribute';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
export declare class AttributeService {
    private readonly em;
    private readonly attributeRepository;
    private readonly groupRepository;
    private readonly productRepository;
    constructor(em: EntityManager, attributeRepository: EntityRepository<Attribute>, groupRepository: EntityRepository<Group>, productRepository: EntityRepository<Part>);
    create(payload: CreateAttribute): Promise<Attribute>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Attribute, never>>;
    find(filters: FilterEntity<Attribute>): Promise<import("@mikro-orm/core").Loaded<Attribute, any>[]>;
    update(id: string, payload: UpdateAttribute): Promise<import("@mikro-orm/core").Loaded<Attribute, "group" | "options">>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    updateGroup(id: string, groupId: string): Promise<import("@mikro-orm/core").Loaded<Attribute, never>>;
    findBy(partId: string): Promise<Attribute[]>;
}
//# sourceMappingURL=attribute.service.d.ts.map