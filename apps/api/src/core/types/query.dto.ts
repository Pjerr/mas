import { Sort } from '@/core/types/sort.request';
import { IsEnum } from 'class-validator';
import { ConditionalOperator } from 'shared';

export interface EntityRelations<RelationTypes> {
  include?: RelationTypes[];
}

export class Filter {
  field: string;
  value: any;
  @IsEnum(ConditionalOperator)
  operator: ConditionalOperator;
}

export class QueryEntity<RelationTypes, T>
  implements EntityRelations<RelationTypes>
{
  filters?: Filter[];
  include?: RelationTypes[];
  sort?: Sort;
}
export class EntityFilters {
  ids?: string[];
}
