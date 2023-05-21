import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import AttributeOption from '@/core/entities/attribute-option';

@Injectable()
export class OptionService {
  constructor(private readonly em: EntityManager) {}

  async create(createOptionDto: CreateOptionDto) {
    const option = this.em.create(AttributeOption, { ...createOptionDto });
    await this.em.persistAndFlush(option);
    return option;
  }

  findAll() {
    return this.em.find(AttributeOption, {});
  }

  findOne(id: string) {
    return this.em.findOneOrFail(AttributeOption, id);
  }

  async update(id: string, updateOptionDto: UpdateOptionDto) {
    const option = await this.findOne(id);
    option.assign(updateOptionDto);
    await this.em.persistAndFlush(option);
    return option;
  }

  async remove(id: string) {
    const option = this.em.getReference(AttributeOption, id);
    await this.em.removeAndFlush(option);
  }
}
