import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Manufacturer } from '@/core/entities';

@Injectable()
export class ManufacturerService {
  constructor(private readonly em: EntityManager) {}

  async create(createManufacturerDto: CreateManufacturerDto) {
    const manufacturer = this.em.create(Manufacturer, {
      ...createManufacturerDto,
    });
    await this.em.persistAndFlush(manufacturer);
    return manufacturer;
  }

  findAll() {
    return this.em.find(Manufacturer, {});
  }

  findOne(id: string) {
    return this.em.findOneOrFail(Manufacturer, id);
  }

  async update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    const manufacturer = await this.findOne(id);
    manufacturer.assign(updateManufacturerDto);
    await this.em.persistAndFlush(manufacturer);
    return manufacturer;
  }

  async remove(id: string) {
    const manufacturer = this.em.getReference(Manufacturer, id);
    await this.em.removeAndFlush(manufacturer);
  }
}
