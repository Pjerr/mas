import { AttributeOption } from '@/core/entities';
import { QueryEntity } from '@/core/types';

export type OptionRelationTypes = 'attribute';

export class QueryOption extends QueryEntity<
  OptionRelationTypes,
  AttributeOption
> {
  include?: OptionRelationTypes[];
}
