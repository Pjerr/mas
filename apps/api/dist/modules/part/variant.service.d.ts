import { OptionConfig, Variant } from '@/core/entities';
import { OptionConfigService } from '@/modules/attribute/option-config.service';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateConfig } from '../attribute/dto/option';
import { GeneratedVariants } from './types';
export declare class VariantService {
    private readonly em;
    private readonly configService;
    private readonly repository;
    constructor(em: EntityManager, configService: OptionConfigService, repository: EntityRepository<Variant>);
    cartesianPart(data: OptionConfig[][]): OptionConfig[][];
    generateVariants(partId: string, attributeConfigs: CreateConfig[][]): Promise<GeneratedVariants>;
}
//# sourceMappingURL=variant.service.d.ts.map