import { Attribute } from '@/core/entities';
import { QueryEntity } from '@/core/types';

const POPULATE = ['options', 'options.configs'];
export type AttributeRelationTuple = typeof POPULATE;

export type AttributeRelationTypes = AttributeRelationTuple[number];

export class QueryAttribute extends QueryEntity<
  AttributeRelationTypes,
  Attribute
> {
  include?: AttributeRelationTypes[];
}
