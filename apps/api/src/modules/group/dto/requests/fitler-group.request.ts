import { Group } from '@/core/entities';
import { QueryEntity } from '@/core/types';

const POPULATE = [
  'attributes',
  'attributes.group',
  'attributes.options.configs',
];

export type GroupRelationTuple = typeof POPULATE;

export type GroupRelationTypes = GroupRelationTuple[number];

export class QueryGroup extends QueryEntity<GroupRelationTypes, Group> {
  include?: GroupRelationTypes[];
}
