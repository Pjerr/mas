import { Entity, FilterQuery, Property } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { OptionConfig } from './option-config.entity';

@Entity({
  virtual: true,
  expression: (em: EntityManager, where: FilterQuery<any>) => {
    return em
      .createQueryBuilder(OptionConfig, 'c')
      .select([
        'c.id',
        'c.price',
        'o.attribute_id',
        'o.value',
        'a.display_name',
        'c.part_id',
      ])
      .join('c.option', 'o')
      .join('o.attribute', 'a')
      .where(where);
  },
})
export class VariantConfig {
  @Property()
  id: string;

  @Property()
  price: number;

  @Property({ name: 'attribute_id' })
  attributeId: string;

  @Property({ name: 'display_name' })
  attributeName: string;

  @Property({ name: 'value' })
  optionValue: string;

  @Property({ name: 'part_id' })
  part: string;
}
