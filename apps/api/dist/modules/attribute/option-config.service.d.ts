import { OptionConfig } from '@/core/entities';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { CreateConfig } from './dto/option';
export declare class OptionConfigService {
    private readonly em;
    private readonly configRepository;
    constructor(em: EntityManager, configRepository: EntityRepository<OptionConfig>);
    create(partId: string, configs: CreateConfig[]): Promise<OptionConfig[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<OptionConfig, never>>;
    removeMany(partId: string): Promise<void>;
}
//# sourceMappingURL=option-config.service.d.ts.map