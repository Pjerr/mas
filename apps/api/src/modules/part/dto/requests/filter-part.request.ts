import { Part } from '@/core/entities';
import { QueryEntity } from '@/core/types';

export type PartRelationTypes = 'attributes.group';

export class QueryPart extends QueryEntity<PartRelationTypes, Part> {
  include?: PartRelationTypes[];
}
