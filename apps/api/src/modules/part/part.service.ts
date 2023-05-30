import { Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePart } from './dto/requests/update-part.request';

@Injectable()
export class PartService {
  create(createPartDto: CreatePartDto) {
    return 'This action adds a new part';
  }

  findAll() {
    return `This action returns all part`;
  }

  findOne(id: number) {
    return `This action returns a #${id} part`;
  }

  update(id: number, updatePartDto: UpdatePart) {
    return `This action updates a #${id} part`;
  }

  remove(id: number) {
    return `This action removes a #${id} part`;
  }
}
