import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Group } from '@/core/entities';
export declare class GroupService {
    private readonly em;
    constructor(em: EntityManager);
    create(createGroupDto: CreateGroupDto): Promise<Group>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Group, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<Group, never>>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<import("@mikro-orm/core").Loaded<Group, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=group.service.d.ts.map