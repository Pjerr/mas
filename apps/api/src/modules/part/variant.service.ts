import { AttributeOption, OptionConfig, Variant } from '@/core/entities';
import { OptionConfigService } from '@/modules/attribute/option-config.service';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateConfig } from '../attribute/dto/option';
import { GeneratedVariants } from './types';

@Injectable()
export class VariantService {
  constructor(
    private readonly em: EntityManager,
    private readonly configService: OptionConfigService,
    @InjectRepository(Variant)
    private readonly repository: EntityRepository<Variant>,
  ) {}

  cartesianPart(data: OptionConfig[][]): OptionConfig[][] {
    return data.reduce(
      function (previous, current) {
        return previous
          .map((x) => current.map((y) => x.concat([y])))
          .reduce((previous, current) => previous.concat(current), []);
      },
      [[]],
    );
  }

  async generateVariants(
    partId: string,
    attributeConfigs: CreateConfig[][],
  ): Promise<GeneratedVariants> {
    if (attributeConfigs.length === 0) return { configs: [], variants: [] };

    const optionConfigs = attributeConfigs.map((configs) =>
      this.configService.create(partId, configs),
    );

    const configVariants = this.cartesianPart(await Promise.all(optionConfigs));

    Logger.log('config-combinations', configVariants);

    const variants = configVariants.map((configVariant) =>
      this.repository.create({
        part: partId,
        optionsConfigs: configVariant,
      }),
    );

    return { configs: configVariants, variants };
  }

  // async findOne(id: string) {
  //   const variant = await this.repository.findOne(id);

  //   if (!variant) throw new NotFoundException('Variant does not exist');

  //   return variant;
  // }

  // async find() {
  //   const variant = await this.repository.findAll();

  //   return variant;
  // }

  // async remove(id: string) {
  //   const variant = await this.repository.findOne(id);

  //   if (!variant) throw new NotFoundException('Variant does not exist');

  //   await this.em.removeAndFlush(variant);
  // }
}
