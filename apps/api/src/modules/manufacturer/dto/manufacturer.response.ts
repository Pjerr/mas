import { Manufacturer } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class ManufacturerResponse implements EntityResponse<Manufacturer> {
  data: Manufacturer;
  links?: string[];
}

export class ManufacturersResponse implements EntityResponse<Manufacturer[]> {
  data: Manufacturer[];
  links?: string[];
}
