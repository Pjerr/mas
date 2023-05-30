import { Manufacturer } from '@/core/entities';
import { QueryEntity } from '@/core/types';

export type ManufacturerRelationTypes = 'parts';

export class QueryManufacturer extends QueryEntity<
  ManufacturerRelationTypes,
  Manufacturer
> {
  include?: ManufacturerRelationTypes[];
}
