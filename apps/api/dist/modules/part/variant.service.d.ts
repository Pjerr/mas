import { AttributeOption, OptionConfig, Variant } from '@/core/entities';
import { OptionConfigService } from '@/modules/attribute/option-config.service';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
export declare class VariantService {
    private readonly em;
    private readonly configService;
    private readonly repository;
    constructor(em: EntityManager, configService: OptionConfigService, repository: EntityRepository<Variant>);
    cartesianProduct(data: OptionConfig[][]): OptionConfig[][];
    generateVariants(partId: string, options: AttributeOption[][]): Variant[];
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Variant, never>>;
    find(): Promise<import("@mikro-orm/core").Loaded<Variant, never>[]>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=variant.service.d.ts.map