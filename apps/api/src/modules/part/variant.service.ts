import { Part } from '@/core/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { VariantConfigResponse } from '../attribute/dto/option/requests/config.response';
import { VariantConfig } from '@/core/entities/variant_config.entity';
import { Variant } from '@/core/entities/variant.entity';
import { FilterEntity } from '@/core/types';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class VariantService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Variant)
    private readonly variantsRepository: EntityRepository<Variant>,
  ) {}

  cartesianPart(data: VariantConfigResponse[][]): VariantConfigResponse[][] {
    return data.reduce(
      function (previous, current) {
        return previous
          .map((x) => current.map((y) => x.concat([y])))
          .reduce((previous, current) => previous.concat(current), []);
      },
      [[]],
    );
  }

  async find(filters: FilterEntity<Variant>) {
    const variants = await this.variantsRepository.find(
      filters.query,
      filters.options,
    );

    if (!variants) throw new NotFoundException('Variants not found');

    return variants;
  }

  async create(partId: string) {
    const part = await this.em.findOne(Part, { id: partId });

    if (!part) throw new NotFoundException('Part does not exist');

    const response = await this.em.find(VariantConfig, {
      part: partId,
    });

    const configs: Record<string, VariantConfigResponse[]> = {};
    response.forEach((config) => {
      if (!configs[config.attributeId]) {
        configs[config.attributeId] = [];
      }

      configs[config.attributeId].push({
        attributeName: config.attributeName,
        id: config.id,
        price: config.price,
        optionValue: config.optionValue,
      });
    });

    const configVariants = this.cartesianPart(Object.values(configs));

    const variants: Variant[] = configVariants.map((config) => {
      const properties = config.map((value) => ({
        [value.attributeName]: value.optionValue,
      }));

      const variantPrice = config.reduce(
        (total, config) => total + config.price,
        0,
      );

      const variant = this.em.create(Variant, {
        part: partId,
        properties,
        price: part.basePrice + variantPrice,
      });

      this.em.persist(variant);

      return variant;
    });

    this.em.flush();

    return variants;
  }

  async update(partId: string) {
    const variants = await this.em.find(Variant, { part: partId });
    await this.em.removeAndFlush(variants);
    return this.create(partId);
  }

  async toggle(ids: string[]) {
    const variants: Variant[] = await this.em.find(Variant, {
      id: { $in: ids },
    });

    variants.forEach((variant) => {
      variant.disabled = !variant.disabled;
    });

    await this.em.flush();

    return variants;
  }
}
