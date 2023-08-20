import { OptionConfig, Part } from '@/core/entities';
import { EntityResponse } from '@/core/types';
export declare class PartResponse implements EntityResponse<Part> {
    data: Part;
    variantConfigs?: OptionConfig[][];
}
export declare class PartsResponse implements EntityResponse<Part[]> {
    data: Part[];
}
//# sourceMappingURL=part.response.d.ts.map