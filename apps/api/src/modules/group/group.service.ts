import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroup } from './dto/requests/create-group.request';
import { UpdateGroup } from './dto/requests/update-group.request';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Group, GroupDocument } from '@/core/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { FilterEntity } from '@/core/types';
import { InjectMeiliSearch } from '@/providers/meilisearch/inject-meilisearch.decorator';
import MeiliSearch, { SearchResponse } from 'meilisearch';
import { index_key_group } from '@/providers/eventSubscribers/index.config';

@Injectable()
export class GroupService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Group)
    private readonly groupRepository: EntityRepository<Group>,
    @InjectMeiliSearch()
    private readonly meiliSearchClient: MeiliSearch,
  ) {}

  async create(payload: CreateGroup) {
    const group = this.groupRepository.create({ ...payload });
    await this.em.persistAndFlush(group);
    return group;
  }

  async find(filters: FilterEntity<Group>) {
    const groups = await this.groupRepository.find(
      filters.query,
      filters.options,
    );
    if (!groups) throw new NotFoundException('Groups not found');
    return groups;
  }

  async findOne(id: string) {
    const group = await this.groupRepository.findOneOrFail(id);
    return group;
  }

  async update(id: string, payload: UpdateGroup) {
    const group = await this.findOne(id);

    group.assign(group);

    await this.em.persistAndFlush(group);

    return group;
  }

  async remove(id: string) {
    const group = await this.groupRepository.find(id, {
      populate: ['attributes', 'attributes.options'],
    });

    if (!group) throw new NotFoundException('Group does not exist');

    await this.em.removeAndFlush(group);
  }

  async groupSearch(search: string) {
    const result: SearchResponse = await this.meiliSearchClient
      .index(index_key_group)
      .search(search);
    return result.hits as GroupDocument[];
  }
}
