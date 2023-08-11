import { VariantConfigResponse } from '@/modules/attribute/dto/option';

export class Variants {
  configs: VariantConfigResponse[][];

  basePrice: number;

  product: string;
}

export class VariantsResponse {
  data: Variants;
  links?: string[];
}
