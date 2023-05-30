import { Manufacturer } from '@/core/entities';
import { QueryEntity } from '@/core/types';
export type ManufacturerRelationTypes = 'parts';
export declare class QueryManufacturer extends QueryEntity<ManufacturerRelationTypes, Manufacturer> {
    include?: ManufacturerRelationTypes[];
}
//# sourceMappingURL=filter-manufacturer.request.d.ts.map