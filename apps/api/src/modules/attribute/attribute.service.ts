import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Attribute } from '@/core/entities';

@Injectable()
export class AttributeService {
  constructor(private readonly em: EntityManager) {}

  async create(createAttributeDto: CreateAttributeDto) {
    const attribute = this.em.create(Attribute, {
      ...createAttributeDto,
      group: createAttributeDto.groupId,
    });
    await this.em.persistAndFlush(attribute);
    return attribute;
  }

  findAll() {
    return this.em.find(Attribute, {});
  }

  findOne(id: string) {
    return this.em.findOneOrFail(Attribute, id);
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    const attribute = await this.findOne(id);
    attribute.assign(attribute);
    await this.em.persistAndFlush(attribute);
    return attribute;
  }

  async remove(id: string) {
    const attribute = this.em.getReference(Attribute, id);
    await this.em.remove(attribute).flush();
  }
}
