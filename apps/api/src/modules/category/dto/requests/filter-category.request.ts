import { Category } from '@/core/entities';
import { QueryEntity } from '@/core/types';

export type CategoryRelationTypes = 'children';
export class QueryCategory extends QueryEntity<
  CategoryRelationTypes,
  Category
> {
  include?: CategoryRelationTypes[];
}
