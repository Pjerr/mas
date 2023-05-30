import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroup } from './dto/requests/create-group.request';
import { UpdateGroup } from './dto/requests/update-group.request';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Group } from '@/core/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { FilterEntity } from '@/core/types';

@Injectable()
export class GroupService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Group)
    private readonly groupRepository: EntityRepository<Group>,
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
}
