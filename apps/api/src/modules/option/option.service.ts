import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOption } from './dto/requests/create-option.request';
import { UpdateOption } from './dto/requests/update-option.request';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import AttributeOption from '@/core/entities/attribute-option';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Attribute } from '@/core/entities';
import { FilterEntity } from '@/core/types';

@Injectable()
export class OptionService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(AttributeOption)
    private readonly optionRepository: EntityRepository<AttributeOption>,
    @InjectRepository(Attribute)
    private readonly attributeRepository: EntityRepository<Attribute>,
  ) {}

  async create(payload: CreateOption) {
    const option = this.optionRepository.create({ ...payload });
    await this.em.persistAndFlush(option);
    return option;
  }

  async multipleCreate(payloads: CreateOption[]) {
    const options = payloads.map((payload) =>
      this.optionRepository.create({ ...payload }),
    );

    return options;
  }

  async find(filters: FilterEntity<AttributeOption>) {
    const options = await this.optionRepository.find(
      filters.query,
      filters.options,
    );

    if (!options) throw new NotFoundException('Options not found');

    return options;
  }

  findOne(id: string) {
    const option = this.optionRepository.findOneOrFail(id);
    return option;
  }

  async update(id: string, payload: UpdateOption) {
    const option = await this.findOne(id);
    option.assign(payload);
    await this.em.persistAndFlush(option);
    return option;
  }

  async remove(id: string) {
    const option = this.attributeRepository.getReference(id);
    if (!option) throw new NotFoundException('Option not found');
    await this.em.removeAndFlush(option);
  }

  async removeMany(ids: string[]) {
    const optionRefs = ids.map((id) => this.optionRepository.getReference(id));
    await this.em.removeAndFlush(optionRefs);
  }

  async updateAttributeRelation(id: string, attribtueId: string) {
    const option = await this.findOne(id);

    const attribtue = await this.attributeRepository.findOne(attribtueId);

    if (!attribtue) throw new NotFoundException('Attribute not found');

    option.attribute = attribtue.id;

    await this.em.persistAndFlush(option);

    return option;
  }
}
