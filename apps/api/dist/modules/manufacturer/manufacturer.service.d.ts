import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Manufacturer } from '@/core/entities';
export declare class ManufacturerService {
    private readonly em;
    constructor(em: EntityManager);
    create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Manufacturer, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Manufacturer, never>>;
    update(id: string, updateManufacturerDto: UpdateManufacturerDto): Promise<import("@mikro-orm/core").Loaded<Manufacturer, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=manufacturer.service.d.ts.map