import { Part } from '@/core/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { VariantConfigResponse } from '../attribute/dto/option/requests/config.response';
import { VariantConfig } from '@/core/entities/variant_config.entity';

@Injectable()
export class VariantService {
  constructor(private readonly em: EntityManager) {}

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

  async find(id: string) {
    const part = await this.em.findOne(Part, { id });

    if (!part) throw new NotFoundException('Part does not exist');

    const response = await this.em.find(VariantConfig, {
      part: id,
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

    return {
      configs: configVariants,
      basePrice: part.basePrice,
      part: id,
    };
  }
}
