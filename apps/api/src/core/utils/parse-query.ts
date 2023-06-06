import { extractFilterableMetadata } from '../meta/extractors';
import { FilterEntity, QueryEntity } from '../types';

export const filterEntity = <RelationTypes, T>(
  query: QueryEntity<RelationTypes, T>,
  target: Object,
) => {
  const filterEntity: FilterEntity<T> = new FilterEntity<T>();
  setOptions(query, filterEntity);
  setQuery(query, filterEntity, target);
  return filterEntity;
};

const setQuery = <RelationTypes, T>(
  query: QueryEntity<RelationTypes, T>,
  filterEntity: FilterEntity<T>,
  target: Object,
) => {
  if (!query?.filters) return;

  const filterable = extractFilterableMetadata(target);

  query.filters.map((filter) => {
    if (filterable?.includes(filter.field))
      filterEntity.query[filter.field] = {
        [filter.operator]: filter.value,
      };
  });
};

const setOptions = <RelationTypes, T>(
  query: QueryEntity<RelationTypes, T>,
  filterEntity: FilterEntity<T>,
) => {
  //@ts-ignore
  if (query?.include) filterEntity.options['populate'] = query.include;

  if (query?.sort) {
    filterEntity.options['orderBy'] = {};
    filterEntity.options['orderBy'][query.sort.field] = query.sort.order;
  }
};
