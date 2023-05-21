import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    create(createCarDto: CreateCarDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCarDto: UpdateCarDto): string;
    remove(id: string): string;
}
//# sourceMappingURL=car.controller.d.ts.map