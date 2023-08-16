import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { VariantConfigResponse } from '../attribute/dto/option/requests/config.response';
import { Variant } from '@/core/entities/variant.entity';
import { FilterEntity } from '@/core/types';
export declare class VariantService {
    private readonly em;
    private readonly variantsRepository;
    constructor(em: EntityManager, variantsRepository: EntityRepository<Variant>);
    cartesianPart(data: VariantConfigResponse[][]): VariantConfigResponse[][];
    find(filters: FilterEntity<Variant>): Promise<import("@mikro-orm/core").Loaded<Variant, any>[]>;
    create(id: string): Promise<Variant[]>;
    update(id: string): Promise<void>;
}
//# sourceMappingURL=variant.service.d.ts.map