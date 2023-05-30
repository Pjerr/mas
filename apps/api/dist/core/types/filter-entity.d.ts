import { FilterQuery, FindOptions } from '@mikro-orm/core';
export type GenericFindOptions<Entity> = Omit<FindOptions<Entity, any>, 'populate'> & {
    populate?: string[];
};
export declare class FilterEntity<T, P extends string = never> {
    query: FilterQuery<T>;
    options: GenericFindOptions<T>;
    constructor();
}
//# sourceMappingURL=filter-entity.d.ts.map