import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Group } from '@/core/entities';

@Injectable()
export class GroupService {
  constructor(private readonly em: EntityManager) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.em.create(Group, { ...createGroupDto });
    await this.em.persistAndFlush(group);
    return group;
  }

  findAll() {
    return this.em.find(Group, {});
  }

  findOne(id: string) {
    return this.em.findOneOrFail(Group, id);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.em.findOneOrFail(Group, id);
    group.assign(updateGroupDto);
    await this.em.persistAndFlush(group);
    return group;
  }

  async remove(id: string) {
    const group = this.em.getReference(Group, id);
    await this.em.remove(group).flush();
  }
}
