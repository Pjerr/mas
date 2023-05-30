import { Part } from '@/core/entities';
import { EntityResponse } from '@/core/types';
export declare class PartResponse implements EntityResponse<Part> {
    data: Part;
    links?: string[];
}
export declare class PartsResponse implements EntityResponse<Part[]> {
    data: Part[];
    links?: string[];
}
//# sourceMappingURL=part.response.d.ts.map