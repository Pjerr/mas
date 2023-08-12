import { FilterQuery, FindOptions } from '@mikro-orm/core';
export type Entities = 'attribute' | 'part';

export type GenericFindOptions<Entity> = Omit<
  FindOptions<Entity, any>,
  'populate'
> & { populate?: string[] };

export class FilterEntity<T, P extends string = never> {
  query: FilterQuery<T>;
  options: GenericFindOptions<T>;

  constructor() {
    this.query = {};
    this.options = {};
  }
}
