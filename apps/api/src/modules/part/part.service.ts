import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePart } from './dto/requests/update-part.request';
import { CreatePart } from './dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Attribute, Category, Part } from '@/core/entities';
import { FilterEntity } from '@/core/types';

@Injectable()
export class PartService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Part)
    private readonly partRepository: EntityRepository<Part>,
    @InjectRepository(Attribute)
    private readonly attributeRepository: EntityRepository<Attribute>,
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>,
  ) {}

  async create(payload: CreatePart) {
    const part = this.partRepository.create({
      ...payload,
      attributes: payload.attributeIds,
    });

    await this.em.persistAndFlush(part);

    const createdPart = await this.partRepository.findOne(
      {
        id: part.id,
      },
      { populate: ['attributes.group'] },
    );

    return createdPart;
  }

  async find(filters: FilterEntity<Part>) {
    const parts = await this.partRepository.find(
      filters.query,
      filters.options,
    );

    if (!parts) throw new NotFoundException('Parts not found');

    return parts;
  }

  async findOne(id: string) {
    const part = await this.partRepository.findOne(id, {
      populate: ['attributes', 'attributes.group'],
    });
    if (!part) throw new NotFoundException('Part not found');
    return part;
  }

  async update(id: string, payload: UpdatePart) {
    const part = await this.partRepository.findOne(id, {
      populate: ['attributes', 'attributes.group'],
    });

    if (payload.attributeIds) {
      const attributeRefs = payload.attributeIds.map((attributeId) =>
        this.attributeRepository.getReference(attributeId),
      );
      part.attributes.set(attributeRefs);
    }

    part.assign(payload);

    await this.em.persistAndFlush(part);

    const updatedPart = await this.partRepository.findOne(id, {
      populate: ['attributes', 'attributes.group'],
    });

    return updatedPart;
  }

  async multipleCreate(payloads: CreatePart[]) {
    const parts = payloads.map((payload) => {
      return this.partRepository.create({
        ...payload,
        attributes: payload.attributeIds,
      });
    });

    await this.em.persistAndFlush(parts);

    const ids = parts.map((part) => part.id);

    const createdParts = this.partRepository.find(ids, {
      populate: ['attributes.group'],
    });

    return createdParts;
  }

  async multipleUpdate(ids: string[], payloads: UpdatePart[]) {
    const parts = await this.partRepository.find(
      { id: { $in: ids } },
      { populate: ['attributes'] },
    );

    parts.map((part, index) => {
      if (payloads[index].attributeIds) {
        const attribtueRefs = payloads[index].attributeIds.map((attributeId) =>
          this.attributeRepository.getReference(attributeId),
        );
        part.attributes.add(attribtueRefs);
      }
    });

    await this.em.persistAndFlush(parts);

    const updatedParts = this.partRepository.find(ids, {
      populate: ['attributes.group'],
    });

    return updatedParts;
  }

  async remove(id: string) {
    const part = await this.findOne(id);
    await this.em.removeAndFlush(part);
  }

  async removeMany(ids: string[]) {
    const parts = await this.partRepository.find({ id: { $in: ids } });

    if (!parts) throw new NotFoundException('Parts not found');

    await this.em.removeAndFlush(parts);
  }

  async addCategory(id: string, categoryId: string) {
    const part = await this.findOne(id);
    const category = await this.categoryRepository.findOneOrFail(categoryId);

    part.categoryId = category.id;

    await this.em.persistAndFlush(part);

    return part;
  }

  async removeAttribute(id: string, attributeId: string) {
    const part = await this.partRepository.findOne(id, {
      populate: ['attributes'],
    });

    const attribute = this.attributeRepository.getReference(attributeId);

    part.attributes.remove(attribute);

    await this.em.persistAndFlush(part);

    return part;
  }

  async removeAttributes(id: string, attributeIds: string[]) {
    const part = await this.partRepository.findOneOrFail(id, {
      populate: ['attributes'],
    });

    const attributeRefs = attributeIds.map((attributeId) =>
      this.attributeRepository.getReference(attributeId),
    );

    part.attributes.remove(attributeRefs);

    this.em.persistAndFlush(part);

    return part;
  }

  async addAttribute(id: string, attributeId: string) {
    const part = await this.partRepository.findOneOrFail(id, {
      populate: ['attributes'],
    });

    const attributeRef = this.attributeRepository.getReference(attributeId);

    part.attributes.add(attributeRef);

    await this.em.persistAndFlush(part);

    return part;
  }
}
