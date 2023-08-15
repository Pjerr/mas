import { Variant } from '@/core/entities/variant.entity';
import { VariantConfigResponse } from '@/modules/attribute/dto/option';
export declare class Variants {
    configs: VariantConfigResponse[][];
    basePrice: number;
    part: string;
}
export declare class VariantsResponse {
    data: Variant[];
    links?: string[];
}
//# sourceMappingURL=variant.response.d.ts.map