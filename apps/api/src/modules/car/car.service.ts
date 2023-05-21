import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { EntityManager } from '@mikro-orm/core';
import { Car } from '@/core/entities';

@Injectable()
export class CarService {
  constructor(private readonly em: EntityManager) {}

  async create(createCarDto: CreateCarDto) {
    const car = this.em.create(Car, {
      ...createCarDto,
      attributes: createCarDto.attributeIds,
    });

    await this.em.persistAndFlush(car);

    return car;
  }

  findAll() {
    return this.em.find(Car, {});
  }

  findOne(id: string) {
    return this.em.findOneOrFail(Car, id);
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const car = await this.findOne(id);
    car.assign(updateCarDto);
    await this.em.persistAndFlush(car);
    return car;
  }

  async remove(id: string) {
    const car = this.em.getReference(Car, id);
    await this.em.remove(car).flush();
  }
}
