import { BaseEntity } from '@mikro-orm/core';
export declare class Manufacturer extends BaseEntity<Manufacturer, 'id'> {
    id: string;
    name: string;
    address: string;
}
