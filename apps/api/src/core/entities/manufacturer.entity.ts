import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
@Entity()
export class Manufacturer extends BaseEntity<Manufacturer, 'id'> {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  name: string;

  @Property()
  address: string;
}
