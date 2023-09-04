import { Group, GroupDocument } from '@/core/entities';
import { EntityResponse } from '@/core/types';
import { MeiliSearchResponse } from '@/providers/meilisearch/search.response';
export declare class GroupResponse implements EntityResponse<Group> {
    data: Group;
}
export declare class GroupsResponse implements EntityResponse<Group[]> {
    data: Group[];
}
export declare class GroupSearch implements MeiliSearchResponse<GroupDocument> {
    data: GroupDocument[];
}
//# sourceMappingURL=group.response.d.ts.map