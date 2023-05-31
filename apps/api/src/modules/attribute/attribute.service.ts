import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Attribute, Part, Group } from '@/core/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateAttribute, UpdateAttribute } from './dto';
import { generateProperyKey } from '@/core/utils/property-key';
import { FilterEntity } from '@/core/types';

@Injectable()
export class AttributeService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Attribute)
    private readonly attributeRepository: EntityRepository<Attribute>,
    @InjectRepository(Group)
    private readonly groupRepository: EntityRepository<Group>,
    @InjectRepository(Part)
    private readonly carRepository: EntityRepository<Part>,
  ) {}

  async create(payload: CreateAttribute) {
    const propertyKey = generateProperyKey(payload.displayName);
    const attribute = this.attributeRepository.create({
      ...payload,
      propertyKey,
      group: payload.groupId,
    });
    await this.em.persistAndFlush(attribute);
    return attribute;
  }

  async find(filters: FilterEntity<Attribute>) {
    const options = ['group'];
    if (filters.options.populate) options.push(...filters.options.populate);

    const attributes = await this.attributeRepository.find(filters.query, {
      ...filters.options,
      populate: options,
    });

    if (!attributes) throw new NotFoundException('Attributes not found');

    return attributes;
  }

  async findOne(id: string) {
    return await this.attributeRepository.findOneOrFail(id);
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

    const cars = await this.carRepository.find({
      attributes: { id: { $eq: id } },
    });

    cars.map((car) => {
      const properties = car.properties;
      delete properties[attribute.displayName];
      car.assign(properties);
      this.em.persist(car);
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

    const group = await this.groupRepository.findOne(groupId);

    if (!group) throw new NotFoundException('Group does not exist');

    attribute.group = group;

    await this.em.persistAndFlush(attribute);

    return attribute;
  }

  async findBy(productId: string) {
    const attributeQb = this.attributeRepository.createQueryBuilder();

    const response = await attributeQb
      .select(['displayName', 'id', 'propertyKey'])
      .where({ products: { id: { $eq: productId } } })
      .execute('all');

    return response;
  }
}
