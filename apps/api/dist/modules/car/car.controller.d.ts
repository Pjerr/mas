import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    create(createCarDto: CreateCarDto): Promise<import("../../core/entities").Car>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Car, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Car, never>>;
    update(id: string, updateCarDto: UpdateCarDto): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Car, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=car.controller.d.ts.map