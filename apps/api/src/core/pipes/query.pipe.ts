import { Filter, QueryEntity } from '@/core/types';
import { Injectable, PipeTransform } from '@nestjs/common';
import { isArray } from 'class-validator';

@Injectable()
export class QueryPipe<RelationTypes, T> implements PipeTransform {
  transform(query: QueryEntity<RelationTypes, T>) {
    if (query) query.include = this.intoArray(query.include);
    if (query) query.filters = this.intoArray(query.filters);

    return query;
  }

  intoArray = (property: RelationTypes[] | Filter[]) => {
    const include = [];
    if (property)
      if (isArray(property) && property.length > 0)
        property.map((value: any) => include.push(value));
      else include.push(property);

    return include;
  };
}
