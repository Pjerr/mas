import { BaseEntity } from '@mikro-orm/core';
export declare class Car extends BaseEntity<Car, 'id'> {
    id: string;
    name: string;
}
