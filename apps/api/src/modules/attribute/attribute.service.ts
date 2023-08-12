import { Attribute, Group, Part } from '@/core/entities';
import { FilterEntity } from '@/core/types';
import { generatePropertyKey } from '@/core/utils/property-key';
import {
  CreateAttribute,
  UpdateAttribute,
} from '@/modules/attribute/dto/attribute';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AttributeService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Attribute)
    private readonly attributeRepository: EntityRepository<Attribute>,
  ) {}

  async create(payload: CreateAttribute) {
    const propertyKey = generatePropertyKey(payload.displayName);
    const attribute = this.attributeRepository.create({
      ...payload,
      propertyKey,
      group: payload.groupId,
    });

    await this.em.persistAndFlush(attribute);

    return attribute;
  }

  async findOne(id: string) {
    const attribute = await this.attributeRepository.findOne(id);
    if (!attribute) throw new NotFoundException('Attribute does not exist');
    return attribute;
  }

  async find(filters: FilterEntity<Attribute>) {
    const options = ['group'];
    if (filters.options.populate) {
      options.push(...filters.options.populate);
    }

    const attributes = await this.attributeRepository.find(filters.query, {
      ...filters.options,
      populate: options,
    });

    if (!attributes) throw new NotFoundException('Attributes do not exist');

    return attributes;
  }

  async update(id: string, payload: UpdateAttribute) {
    const attribute = await this.attributeRepository.findOne(id, {
      populate: ['options', 'group'],
    });

    attribute.assign(payload);

    await this.em.persistAndFlush(attribute);

    return attribute;
  }

  async remove(id: string) {
    const attribute = await this.attributeRepository.findOne(id, {
      populate: ['options'],
    });

    const parts = await this.em.find(Part, {
      attributes: { id: { $eq: id } },
    });

    parts.forEach((part) => {
      const properties = part.properties;
      delete properties[attribute.propertyKey];

      part.assign(properties);
    });

    await this.em.removeAndFlush(attribute);
  }

  async removeMany(ids: string[]) {
    ids.forEach((id) => {
      this.remove(id);
    });

    await this.em.flush();
  }

  async updateGroup(id: string, groupId: string) {
    const attribute = await this.findOne(id);

    const group = await this.em.findOne(Group, groupId);

    if (!group) throw new NotFoundException('Group does not exist');

    attribute.group = group;

    await this.em.persistAndFlush(attribute);

    return attribute;
  }

  async findBy(partId: string) {
    const attributeQb = this.attributeRepository.createQueryBuilder();

    const response = await attributeQb
      .select(['displayName', 'id', 'propertyKey'])
      .where({ parts: { id: { $eq: partId } } })
      .execute('all');

    return response;
  }
}
