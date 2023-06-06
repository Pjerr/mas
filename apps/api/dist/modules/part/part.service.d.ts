import { UpdatePart } from './dto/requests/update-part.request';
import { CreatePart } from './dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Attribute, Category, Part } from '@/core/entities';
import { FilterEntity } from '@/core/types';
export declare class PartService {
    private readonly em;
    private readonly partRepository;
    private readonly attributeRepository;
    private readonly categoryRepository;
    constructor(em: EntityManager, partRepository: EntityRepository<Part>, attributeRepository: EntityRepository<Attribute>, categoryRepository: EntityRepository<Category>);
    create(payload: CreatePart): Promise<import("@mikro-orm/core").Loaded<Part, "attributes.group">>;
    find(filters: FilterEntity<Part>): Promise<import("@mikro-orm/core").Loaded<Part, any>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes" | "attributes.group">>;
    update(id: string, payload: UpdatePart): Promise<import("@mikro-orm/core").Loaded<Part, "attributes" | "attributes.group">>;
    multipleCreate(payloads: CreatePart[]): Promise<import("@mikro-orm/core").Loaded<Part, "attributes.group">[]>;
    multipleUpdate(ids: string[], payloads: UpdatePart[]): Promise<import("@mikro-orm/core").Loaded<Part, "attributes.group">[]>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    addCategory(id: string, categoryId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes" | "attributes.group">>;
    removeAttribute(id: string, attributeId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
    removeAttributes(id: string, attributeIds: string[]): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
    addAttribute(id: string, attributeId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
}
//# sourceMappingURL=part.service.d.ts.map