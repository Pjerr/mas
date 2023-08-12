import { Attribute } from '@/core/entities';
import { QueryEntity } from '@/core/types';
declare const POPULATE: string[];
export type AttributeRelationTuple = typeof POPULATE;
export type AttributeRelationTypes = AttributeRelationTuple[number];
export declare class QueryAttribute extends QueryEntity<AttributeRelationTypes, Attribute> {
    include?: AttributeRelationTypes[];
}
export {};
//# sourceMappingURL=filter-attribute.request.d.ts.map