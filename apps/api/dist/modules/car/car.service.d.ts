import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
export declare class CarService {
    create(createCarDto: CreateCarDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCarDto: UpdateCarDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=car.service.d.ts.map