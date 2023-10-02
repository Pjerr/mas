import { CreateConfig } from '@/modules/attribute/dto/option';
import { PartStatus, PropertyType } from 'shared';
export declare class CreatePart {
    status?: PartStatus;
    name: string;
    manufacturerId?: string;
    attributeIds?: string[];
    properties?: PropertyType;
    basePrice: number;
    attributeConfigs: CreateConfig[][];
}
//# sourceMappingURL=create-part.request.d.ts.map