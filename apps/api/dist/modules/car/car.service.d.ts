import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { EntityManager } from '@mikro-orm/core';
import { Car } from '@/core/entities';
export declare class CarService {
    private readonly em;
    constructor(em: EntityManager);
    create(createCarDto: CreateCarDto): Promise<Car>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Car, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Car, never>>;
    update(id: string, updateCarDto: UpdateCarDto): Promise<import("@mikro-orm/core").Loaded<Car, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=car.service.d.ts.map