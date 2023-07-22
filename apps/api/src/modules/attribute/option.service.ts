import { Attribute, AttributeOption } from '@/core/entities';
import { FilterEntity } from '@/core/types';
import { CreateOption, UpdateOption } from '@/modules/attribute/dto/option';
import { EntityRepository, LoadStrategy } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FilterOptionConfig } from './dto/option/requests/filter-option-config.request';

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
    const option = this.optionRepository.create({
      ...payload,
      attribute: payload.attributeId,
    });

    await this.em.persistAndFlush(option);
    return option;
  }

  async multipleCreate(payloads: CreateOption[]) {
    const options = payloads.map((payload) => {
      const option = this.optionRepository.create({
        ...payload,
        attribute: payload.attributeId,
      });

      return option;
    });

    await this.em.persistAndFlush(options);

    return options;
  }

  async find(filters: FilterEntity<AttributeOption>) {
    const options = await this.optionRepository.find(
      filters.query,
      filters.options,
    );

    if (!options) throw new NotFoundException('Options do not exist');

    return options;
  }

  async findOne(id: string) {
    const option = await this.optionRepository.findOne(id);

    if (!option) throw new NotFoundException('Option does not exist');

    return option;
  }

  async update(id: string, payload: UpdateOption) {
    const option = await this.findOne(id);

    option.assign(payload);

    await this.em.persistAndFlush(option);

    return option;
  }

  async remove(id: string) {
    const option = this.optionRepository.getReference(id);

    if (!option) throw new NotFoundException('Option does not exist');

    await this.em.removeAndFlush(option);
  }

  async removeMany(ids: string[]) {
    const optionRefs = ids.map((id) => this.optionRepository.getReference(id));
    await this.em.removeAndFlush(optionRefs);
  }

  async updateAttributeRelation(id: string, attributeId: string) {
    const option = await this.findOne(id);

    const attribute = await this.attributeRepository.findOne(attributeId);

    if (!attribute) throw new NotFoundException('Attribute does not exist');

    option.attribute = attribute.id;

    await this.em.persistAndFlush(option);

    return option;
  }

  async findPartOptions(request: FilterOptionConfig) {
    const options = await this.optionRepository.find(
      { attribute: { $eq: request.attributeId } },

      {
        strategy: LoadStrategy.SELECT_IN,
        populate: ['configs'],
        populateWhere: {
          configs: {
            variants: {
              part: { id: { $eq: request.partId } },
            },
          },
        },
      },
    );

    return options;
  }
}
