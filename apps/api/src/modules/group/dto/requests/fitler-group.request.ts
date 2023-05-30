import { Group } from '@/core/entities';
import { QueryEntity } from '@/core/types';

export type GroupRelationTypes = 'attributes';

export class QueryGroup extends QueryEntity<GroupRelationTypes, Group> {
  include?: GroupRelationTypes[];
}
