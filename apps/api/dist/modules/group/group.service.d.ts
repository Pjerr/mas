import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupService {
    create(createGroupDto: CreateGroupDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGroupDto: UpdateGroupDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=group.service.d.ts.map