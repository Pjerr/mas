import { Part } from '@/core/entities';
import { QueryEntity } from '@/core/types';
declare const POPULATE: string[];
export type PartRelationTuple = typeof POPULATE;
export type PartRelationTypes = PartRelationTuple[number];
export declare class QueryPart extends QueryEntity<PartRelationTypes, Part> {
    include?: PartRelationTypes[];
}
export {};
//# sourceMappingURL=filter-part.request.d.ts.map