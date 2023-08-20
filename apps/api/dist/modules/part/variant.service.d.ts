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
    create(partId: string): Promise<Variant[]>;
    update(partId: string): Promise<Variant[]>;
    toggle(ids: string[]): Promise<Variant[]>;
    updateUploadedImage(id: string): Promise<import("@mikro-orm/core").Loaded<Variant, never>>;
}
//# sourceMappingURL=variant.service.d.ts.map