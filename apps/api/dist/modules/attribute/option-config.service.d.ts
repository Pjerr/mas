import { AttributeOption, OptionConfig } from '@/core/entities';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
export declare class OptionConfigService {
    private readonly em;
    private readonly configRepository;
    constructor(em: EntityManager, configRepository: EntityRepository<OptionConfig>);
    create(options: AttributeOption[]): OptionConfig[];
}
//# sourceMappingURL=option-config.service.d.ts.map