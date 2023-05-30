import { Manufacturer } from '@/core/entities';
import { EntityResponse } from '@/core/types';
export declare class ManufacturerResponse implements EntityResponse<Manufacturer> {
    data: Manufacturer;
    links?: string[];
}
export declare class ManufacturersResponse implements EntityResponse<Manufacturer[]> {
    data: Manufacturer[];
    links?: string[];
}
//# sourceMappingURL=manufacturer.response.d.ts.map