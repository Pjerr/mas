import { GroupService } from './group.service';
import { CreateGroup } from './dto/requests/create-group.request';
import { UpdateGroup } from './dto/requests/update-group.request';
import { GroupResponse, GroupsResponse, QueryGroup } from './dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(payload: CreateGroup): Promise<GroupResponse>;
    findAll(query: QueryGroup): Promise<GroupsResponse>;
    findOne(id: string): Promise<GroupResponse>;
    update(id: string, payload: UpdateGroup): Promise<GroupResponse>;
    remove(id: string): Promise<void>;
}
//# sourceMappingURL=group.controller.d.ts.map