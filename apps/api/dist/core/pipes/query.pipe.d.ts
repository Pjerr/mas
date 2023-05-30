import { PipeTransform } from '@nestjs/common';
import { Filter, QueryEntity } from '../types';
export declare class QueryPipe<RelationTypes, T> implements PipeTransform {
    transform(query: QueryEntity<RelationTypes, T>): QueryEntity<RelationTypes, T>;
    intoArray: (property: RelationTypes[] | Filter[]) => any[];
}
//# sourceMappingURL=query.pipe.d.ts.map