import { Variant } from '@/core/entities/variant.entity';
import { QueryEntity } from '@/core/types';

const POPULATE = [];

export type FitlerRelationTuple = typeof POPULATE;

export type FilterRelationTypes = FitlerRelationTuple[number];

export class QueryVariant extends QueryEntity<FilterRelationTypes, Variant> {
  include?: FilterRelationTypes[];
}
