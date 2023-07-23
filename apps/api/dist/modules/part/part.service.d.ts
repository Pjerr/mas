import { UpdatePart } from './dto/requests/update-part.request';
import { CreatePart } from './dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Attribute, Category, Part } from '@/core/entities';
import { FilterEntity } from '@/core/types';
import { CreateConfig } from '../attribute/dto/option';
import { VariantService } from './variant.service';
import { OptionConfigService } from '../attribute/option-config.service';
import { CreatedPart } from './types';
export declare class PartService {
    private readonly em;
    private readonly partRepository;
    private readonly attributeRepository;
    private readonly categoryRepository;
    private readonly variantService;
    private readonly configService;
    constructor(em: EntityManager, partRepository: EntityRepository<Part>, attributeRepository: EntityRepository<Attribute>, categoryRepository: EntityRepository<Category>, variantService: VariantService, configService: OptionConfigService);
    existOptions(attributeConfigs: CreateConfig[][]): CreateConfig[][];
    create(payload: CreatePart): Promise<CreatedPart>;
    createDraft(): Promise<Part>;
    find(filters: FilterEntity<Part>): Promise<import("@mikro-orm/core").Loaded<Part, any>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes.group" | "attributes">>;
    update(id: string, payload: UpdatePart): Promise<CreatedPart>;
    bulkUpdatePrice(ids: string[], payloads: number[]): Promise<Part[]>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
    addCategory(id: string, categoryId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes.group" | "attributes">>;
    removeAttribute(id: string, attributeId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
    removeAttributes(id: string, attributeIds: string[]): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
    addAttribute(id: string, attributeId: string): Promise<import("@mikro-orm/core").Loaded<Part, "attributes">>;
}
//# sourceMappingURL=part.service.d.ts.map