import { Group } from '@/core/entities';
import { QueryEntity } from '@/core/types';
declare const POPULATE: string[];
export type GroupRelationTuple = typeof POPULATE;
export type GroupRelationTypes = GroupRelationTuple[number];
export declare class QueryGroup extends QueryEntity<GroupRelationTypes, Group> {
    include?: GroupRelationTypes[];
}
export {};
//# sourceMappingURL=fitler-group.request.d.ts.map