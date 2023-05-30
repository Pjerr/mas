import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategory } from './dto/requests/create-category.request';
import { UpdateCategory } from './dto/requests/update-category.request';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Category } from '@/core/entities';
import { EntityRepository } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { FilterEntity } from '@/core/types';
import { UpdateRelation } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
  ) {}

  async create(payload: CreateCategory) {
    const category = this.categoryRepository.create({
      ...payload,
      parentId: payload.parentId,
      children: payload.childrenIds,
    });

    await this.em.persistAndFlush(category);

    return category;
  }

  async find(filters: FilterEntity<Category>) {
    const categories = await this.categoryRepository.find(
      filters.query,
      filters.options,
    );

    if (!categories) throw new NotFoundException('Categories not found');

    categories.forEach((category) => category.children.populated(false));

    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOneOrFail(id);

    return category;
  }

  async update(id: string, payload: UpdateCategory) {
    const category = await this.findOne(id);

    category.assign(payload);

    await this.em.persistAndFlush(category);

    return category;
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOneOrFail(id, {
      populate: ['children'],
    });

    await this.em.removeAndFlush(category);
  }

  async updateRelation(id: string, payload: UpdateRelation) {
    const child = await this.categoryRepository.findOneOrFail(id);

    if (!payload.childrenIds.length || !payload.parentId) {
      throw new BadRequestException(
        'ChildrenIds or ParentId missing from payload',
      );
    }

    if (payload.parentId && id === payload.parentId) {
      throw new BadRequestException('Parend and children id are equal');
    }

    const parentId = this.categoryRepository.getReference(payload.parentId).id;

    child.parentId = parentId;

    await this.em.persistAndFlush(child);

    return child;
  }
}
