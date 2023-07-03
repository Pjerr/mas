import { AttributeOption, OptionConfig } from '@/core/entities';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionConfigService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(OptionConfig)
    private readonly configRepository: EntityRepository<OptionConfig>,
  ) {}

  create(options: AttributeOption[]) {
    const configVariant = options.map((option) =>
      this.configRepository.create({ option }),
    );

    this.em.persist(configVariant);

    return configVariant;
  }
}
