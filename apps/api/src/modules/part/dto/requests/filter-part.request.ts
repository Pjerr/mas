import { Part } from '@/core/entities';
import { QueryEntity } from '@/core/types';

const POPULATE = ['attributes.group', 'variants.optionsConfigs'];

export type PartRelationTuple = typeof POPULATE;

export type PartRelationTypes = PartRelationTuple[number];

export class QueryPart extends QueryEntity<PartRelationTypes, Part> {
  include?: PartRelationTypes[];
}
