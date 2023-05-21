import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
export declare class ManufacturerController {
    private readonly manufacturerService;
    constructor(manufacturerService: ManufacturerService);
    create(createManufacturerDto: CreateManufacturerDto): Promise<import("../../core/entities").Manufacturer>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Manufacturer, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Manufacturer, never>>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Manufacturer, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=manufacturer.controller.d.ts.map