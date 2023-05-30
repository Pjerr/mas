import AttributeOption from '@/core/entities/attribute-option';
import { QueryEntity } from '@/core/types';

export type OptionRelationTypes = 'attribtue';

export class QueryOption extends QueryEntity<
  OptionRelationTypes,
  AttributeOption
> {
  include?: OptionRelationTypes[];
}
