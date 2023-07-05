import { EntityType } from '@/store/table/types';

export class BaseEntity {
    id!: string;
}

export const instanceIds: Record<EntityType, string> = {
    [EntityType.Attribute]: 'attribute-table',
    [EntityType.Part]: 'part-table',
    [EntityType.Option]: 'option-table',
    [EntityType.Manufacturer]: 'manufacturer-table',
};
