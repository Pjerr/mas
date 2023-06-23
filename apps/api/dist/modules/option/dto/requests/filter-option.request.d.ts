import AttributeOption from '@/core/entities/attribute-option.entity';
import { QueryEntity } from '@/core/types';
export type OptionRelationTypes = 'attribtue';
export declare class QueryOption extends QueryEntity<OptionRelationTypes, AttributeOption> {
    include?: OptionRelationTypes[];
}
//# sourceMappingURL=filter-option.request.d.ts.map