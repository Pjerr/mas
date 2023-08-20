import { Group } from '@/core/entities';
import { EntityResponse } from '@/core/types';

export class GroupResponse implements EntityResponse<Group> {
  data: Group;
}

export class GroupsResponse implements EntityResponse<Group[]> {
  data: Group[];
}
