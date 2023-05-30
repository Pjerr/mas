import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturer } from './dto/requests/create-manufacturer.request';
import { UpdateManufacturer } from './dto/requests/update-manufacturer.request';
import { ManufacturerResponse, ManufacturersResponse, QueryManufacturer } from './dto';
export declare class ManufacturerController {
    private readonly manufacturerService;
    constructor(manufacturerService: ManufacturerService);
    create(createManufacturerDto: CreateManufacturer): Promise<ManufacturerResponse>;
    find(query: QueryManufacturer): Promise<ManufacturersResponse>;
    findOne(id: string): Promise<ManufacturerResponse>;
    update(id: string, payload: UpdateManufacturer): Promise<ManufacturerResponse>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=manufacturer.controller.d.ts.map