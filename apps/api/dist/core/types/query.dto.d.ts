import { ConditionalOperator } from 'shared';
import { Sort } from './sort.request';
export declare class EntityRelations<RelationTypes> {
    include?: RelationTypes[];
}
export declare class Filter {
    field: string;
    value: any;
    operator: ConditionalOperator;
}
export declare class QueryEntity<RelationTypes, T> implements EntityRelations<RelationTypes> {
    filters?: Filter[];
    include?: RelationTypes[];
    sort?: Sort;
}
export declare class EntityFilters {
    ids?: string[];
}
//# sourceMappingURL=query.dto.d.ts.map