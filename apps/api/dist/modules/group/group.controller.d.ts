import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto): Promise<import("../../core/entities").Group>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Group, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Group, never>>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<import("@mikro-orm/core").Loaded<import("../../core/entities").Group, never>>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=group.controller.d.ts.map