import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from '@/core/entities';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class CategoryService {
  constructor(private readonly em: EntityManager) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.em.create(
      Category,
      {
        ...createCategoryDto,
        parentId: createCategoryDto.parentId,
        children: createCategoryDto.childrenIds,
      },
      { persist: true },
    );

    await this.em.persistAndFlush(category);

    return category;
  }

  findAll() {
    return this.em.find(Category, {});
  }

  findOne(id: string) {
    return this.em.findOne(Category, id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    category.assign(updateCategoryDto);
    await this.em.persistAndFlush(category);
    return category;
  }

  async remove(id: string) {
    const category = this.em.getReference(Category, id);
    await this.em.removeAndFlush(category);
  }
}
