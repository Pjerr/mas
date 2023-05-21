import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Category extends BaseEntity<Category, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;
}
