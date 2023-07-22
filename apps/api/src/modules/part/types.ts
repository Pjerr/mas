import { OptionConfig, Part, Variant } from '@/core/entities';

export interface GeneratedVariants {
  variants: Variant[];
  configs: OptionConfig[][];
}

export interface CreatedPart {
  part: Part;
  configs: OptionConfig[][];
}
