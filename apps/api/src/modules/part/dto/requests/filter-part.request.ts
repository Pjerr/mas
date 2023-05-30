import { Part } from '@/core/entities';
import { QueryEntity } from '@/core/types';

export type PartRelationTypes = 'attribtues.group';

export class QueryPart extends QueryEntity<PartRelationTypes, Part> {
  include?: PartRelationTypes[];
}
