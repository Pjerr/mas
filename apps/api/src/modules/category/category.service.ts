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

    this.em.flush();

    return category;
  }

  findAll() {
    return this.em.find(Category, {});
  }

  findOne(id: string) {
    return this.em.findOne(Category, id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.em.nativeUpdate(Category, id, {
      ...updateCategoryDto,
      parentId: updateCategoryDto.parentId,
      children: updateCategoryDto.childrenIds,
    });
  }

  remove(id: string) {
    const category = this.em.findOneOrFail(Category, id);
    return this.em.removeAndFlush(category);
  }
}
