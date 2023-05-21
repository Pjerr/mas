import { BaseEntity, Collection } from '@mikro-orm/core';
import { Car } from './car.entity';
export declare class Manufacturer extends BaseEntity<Manufacturer, 'id'> {
    id: string;
    name: string;
    address: string;
    cars: Collection<Car, object>;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=manufacturer.entity.d.ts.map