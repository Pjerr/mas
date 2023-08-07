import { EntityManager } from '@mikro-orm/postgresql';
import { VariantConfigResponse } from '../attribute/dto/option/requests/config.response';
export declare class VariantService {
    private readonly em;
    constructor(em: EntityManager);
    cartesianProduct(data: VariantConfigResponse[][]): VariantConfigResponse[][];
    find(id: string): Promise<{
        configs: VariantConfigResponse[][];
        basePrice: number;
        part: string;
    }>;
}
//# sourceMappingURL=variant.service.d.ts.map