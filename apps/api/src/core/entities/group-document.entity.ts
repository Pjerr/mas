import { Group } from '@/core/entities';
import { Entity, FilterQuery, FindOptions, Property } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

@Entity({
  virtual: true,
  expression: (
    em: EntityManager,
    where: FilterQuery<any>,
    options: FindOptions<any, any>,
  ) => {
    return em.find(
      Group,
      { ...where },
      {
        populate: ['attributes'],
        fields: ['id', 'name', 'attributes.displayName', 'attributes.id'],
      },
    );
  },
})
export class GroupDocument {
  @Property()
  id: string;

  @Property()
  name: string;

  @Property({ name: 'attributes' })
  attributes?: AttributeDocument[];
}

export class AttributeDocument {
  @Property({ name: 'attributes.id' })
  id: string;

  @Property({ name: 'attributes.displayName' })
  displayName: string;
}
