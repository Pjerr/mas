import { Attribute } from '@/core/entities';
import { QueryEntity } from '@/core/types';

export type AttributeRelationTypes = 'options';

export class QueryAttribute extends QueryEntity<
  AttributeRelationTypes,
  Attribute
> {
  include?: AttributeRelationTypes[];
}
