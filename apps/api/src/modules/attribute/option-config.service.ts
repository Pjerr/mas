import { OptionConfig } from '@/core/entities';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateConfig } from './dto/option';

@Injectable()
export class OptionConfigService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(OptionConfig)
    private readonly configRepository: EntityRepository<OptionConfig>,
  ) {}

  create(partId: string, configs: CreateConfig[]) {
    const configVariants = configs.map((config) =>
      this.configRepository.create({
        price: config.price,
        option: config.option,
        part: partId,
      }),
    );

    this.em.persist(configVariants);

    return configVariants;
  }

  async findOne(id: string) {
    const option = await this.configRepository.findOne(id);

    if (!option) throw new NotFoundException('Option does not exist');

    return option;
  }

  async removeMany(partId: string) {
    const configs = await this.configRepository.find({
      part: { $eq: partId },
    });

    await this.em.removeAndFlush(configs);
  }
}
