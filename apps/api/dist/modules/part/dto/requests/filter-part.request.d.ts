import { Part } from '@/core/entities';
import { QueryEntity } from '@/core/types';
export type PartRelationTypes = 'attribtues.group';
export declare class QueryPart extends QueryEntity<PartRelationTypes, Part> {
    include?: PartRelationTypes[];
}
//# sourceMappingURL=filter-part.request.d.ts.map