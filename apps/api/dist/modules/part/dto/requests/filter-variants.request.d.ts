import { Variant } from '@/core/entities/variant.entity';
import { QueryEntity } from '@/core/types';
declare const POPULATE: any[];
export type FitlerRelationTuple = typeof POPULATE;
export type FilterRelationTypes = FitlerRelationTuple[number];
export declare class QueryVariant extends QueryEntity<FilterRelationTypes, Variant> {
    include?: FilterRelationTypes[];
}
export {};
//# sourceMappingURL=filter-variants.request.d.ts.map