import { Group, GroupDocument } from '@/core/entities';
import { EntityResponse } from '@/core/types';
import { MeiliSearchResponse } from '@/providers/meilisearch/search.response';

export class GroupResponse implements EntityResponse<Group> {
  data: Group;
}

export class GroupsResponse implements EntityResponse<Group[]> {
  data: Group[];
}

export class GroupSearch implements MeiliSearchResponse<GroupDocument> {
  data: GroupDocument[];
}
