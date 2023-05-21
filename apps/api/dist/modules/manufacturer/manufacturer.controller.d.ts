import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
export declare class ManufacturerController {
    private readonly manufacturerService;
    constructor(manufacturerService: ManufacturerService);
    create(createManufacturerDto: CreateManufacturerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): string;
    remove(id: string): string;
}
//# sourceMappingURL=manufacturer.controller.d.ts.map