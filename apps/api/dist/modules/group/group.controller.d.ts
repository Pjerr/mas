import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateGroupDto: UpdateGroupDto): string;
    remove(id: string): string;
}
//# sourceMappingURL=group.controller.d.ts.map