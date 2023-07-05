import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManufacturer } from './dto/requests/create-manufacturer.request';
import { UpdateManufacturer } from './dto/requests/update-manufacturer.request';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Manufacturer } from '@/core/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { FilterEntity } from '@/core/types';

@Injectable()
export class ManufacturerService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: EntityRepository<Manufacturer>,
  ) {}

  async create(payload: CreateManufacturer) {
    const manufacturer = this.em.create(Manufacturer, {
      ...payload,
    });
    await this.em.persistAndFlush(manufacturer);
    return manufacturer;
  }

  async find(filters: FilterEntity<Manufacturer>) {
    const manufacturers = await this.manufacturerRepository.find(
      filters.query,
      filters.options,
    );

    if (!manufacturers) throw new NotFoundException('Manufacturers not found');

    return manufacturers;
  }

  findOne(id: string) {
    return this.manufacturerRepository.findOneOrFail(id);
  }

  async update(id: string, payload: UpdateManufacturer) {
    const manufacturer = await this.findOne(id);
    manufacturer.assign(payload);
    await this.em.persistAndFlush(manufacturer);
    return manufacturer;
  }

  async remove(id: string) {
    const manufacturer = this.em.getReference(Manufacturer, id);
    await this.em.removeAndFlush(manufacturer);
  }

  async removeMany(ids: string[]) {
    ids.forEach((id) => this.remove(id));
    await this.em.flush();
  }
}
