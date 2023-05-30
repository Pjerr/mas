import AttributeOption from '@/core/entities/attribute-option';
import { EntityResponse } from '@/core/types';
export declare class OptionResponse implements EntityResponse<AttributeOption> {
    data: AttributeOption;
    links?: string[];
}
export declare class OptionsResponse implements EntityResponse<AttributeOption[]> {
    data: AttributeOption[];
    links?: string[];
}
//# sourceMappingURL=option.response.d.ts.map