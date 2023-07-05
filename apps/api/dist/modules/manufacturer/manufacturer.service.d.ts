import { CreateManufacturer } from './dto/requests/create-manufacturer.request';
import { UpdateManufacturer } from './dto/requests/update-manufacturer.request';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Manufacturer } from '@/core/entities';
import { FilterEntity } from '@/core/types';
export declare class ManufacturerService {
    private readonly em;
    private readonly manufacturerRepository;
    constructor(em: EntityManager, manufacturerRepository: EntityRepository<Manufacturer>);
    create(payload: CreateManufacturer): Promise<Manufacturer>;
    find(filters: FilterEntity<Manufacturer>): Promise<import("@mikro-orm/core").Loaded<Manufacturer, any>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Manufacturer, never>>;
    update(id: string, payload: UpdateManufacturer): Promise<import("@mikro-orm/core").Loaded<Manufacturer, never>>;
    remove(id: string): Promise<void>;
    removeMany(ids: string[]): Promise<void>;
}
//# sourceMappingURL=manufacturer.service.d.ts.map