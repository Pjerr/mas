import { UpdatePart } from './dto/requests/update-part.request';
import { CreateDraft, CreatePart } from './dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Attribute, Part } from '@/core/entities';
import { FilterEntity } from '@/core/types';
import { CreateConfig } from '../attribute/dto/option';
import { OptionConfigService } from '../attribute/option-config.service';
export declare class PartService {
    private readonly em;
    private readonly partRepository;
    private readonly attributeRepository;
    private readonly configService;
    constructor(em: EntityManager, partRepository: EntityRepository<Part>, attributeRepository: EntityRepository<Attribute>, configService: OptionConfigService);
    existOptions(attributeConfigs: CreateConfig[][]): CreateConfig[][];
    create(payload: CreatePart): Promise<import("@mikro-orm/core").Loaded<Part, "attributes.options" | "attributes.group">>;
    createDraft(payload: CreateDraft): Promise<Part>;
    find(filters: FilterEntity<Part>): Promise<import("@mikro-orm/core").Loaded<Part, any>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes" | "attributes.options" | "attributes.group">>;
    update(id: string, payload: UpdatePart): Promise<import("@mikro-orm/core").Loaded<Part, never>>;
    bulkUpdatePrice(ids: string[], payloads: number[]): Promise<Part[]>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    addCategory(id: string, categoryId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes" | "attributes.options" | "attributes.group">>;
    removeAttribute(id: string, attributeId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
    removeAttributes(id: string, attributeIds: string[]): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
    addAttribute(id: string, attributeId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
}
//# sourceMappingURL=part.service.d.ts.map