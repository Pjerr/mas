import { OptionConfig, Variant } from '@/core/entities';
import { OptionConfigService } from '@/modules/attribute/option-config.service';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateConfig } from '../attribute/dto/option';
export declare class VariantService {
    private readonly em;
    private readonly configService;
    private readonly repository;
    constructor(em: EntityManager, configService: OptionConfigService, repository: EntityRepository<Variant>);
    cartesianPart(data: OptionConfig[][]): OptionConfig[][];
    generateVariants(partId: string, attributeConfigs: CreateConfig[][]): Variant[];
}
//# sourceMappingURL=variant.service.d.ts.map