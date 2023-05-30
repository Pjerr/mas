import { Category } from '@/core/entities';
import { QueryEntity } from '@/core/types';
export type CategoryRelationTypes = 'children';
export declare class QueryCategory extends QueryEntity<CategoryRelationTypes, Category> {
    include?: CategoryRelationTypes[];
}
//# sourceMappingURL=filter-category.request.d.ts.map