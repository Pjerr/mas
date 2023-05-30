import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Attribute, Part, Group } from '@/core/entities';
import { CreateAttribute, UpdateAttribute } from './dto';
import { FilterEntity } from '@/core/types';
export declare class AttributeService {
    private readonly em;
    private readonly attributeRepository;
    private readonly groupRepository;
    private readonly carRepository;
    constructor(em: EntityManager, attributeRepository: EntityRepository<Attribute>, groupRepository: EntityRepository<Group>, carRepository: EntityRepository<Part>);
    create(payload: CreateAttribute): Promise<Attribute>;
    find(filters: FilterEntity<Attribute>): Promise<import("@mikro-orm/core").Loaded<Attribute, any>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Attribute, never>>;
    update(id: string, payload: UpdateAttribute): Promise<import("@mikro-orm/core").Loaded<Attribute, "group" | "options">>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    updateGroup(id: string, groupId: string): Promise<import("@mikro-orm/core").Loaded<Attribute, never>>;
    findBy(productId: string): Promise<Attribute[]>;
}
//# sourceMappingURL=attribute.service.d.ts.map