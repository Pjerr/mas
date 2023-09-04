import { CreateGroup } from './dto/requests/create-group.request';
import { UpdateGroup } from './dto/requests/update-group.request';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Group, GroupDocument } from '@/core/entities';
import { FilterEntity } from '@/core/types';
import MeiliSearch from 'meilisearch';
export declare class GroupService {
    private readonly em;
    private readonly groupRepository;
    private readonly meiliSearchClient;
    constructor(em: EntityManager, groupRepository: EntityRepository<Group>, meiliSearchClient: MeiliSearch);
    create(payload: CreateGroup): Promise<Group>;
    find(filters: FilterEntity<Group>): Promise<import("@mikro-orm/core").Loaded<Group, any>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Group, never>>;
    update(id: string, payload: UpdateGroup): Promise<import("@mikro-orm/core").Loaded<Group, never>>;
    remove(id: string): Promise<void>;
    groupSearch(search: string): Promise<GroupDocument[]>;
}
//# sourceMappingURL=group.service.d.ts.map