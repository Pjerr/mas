import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturer } from './dto/requests/create-manufacturer.request';
import { UpdateManufacturer } from './dto/requests/update-manufacturer.request';
import { ApiTags } from '@nestjs/swagger';
import {
  ManufacturerRelationTypes,
  ManufacturerResponse,
  ManufacturersResponse,
  QueryManufacturer,
} from './dto';
import { FilterQuery } from '@/core/types';
import { Manufacturer } from '@/core/entities';
import { QueryPipe } from '@/core/pipes/query.pipe';
import { filterEntity } from '@/core/utils/parse-query';

@ApiTags('Manufacturer')
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  async create(
    @Body() createManufacturerDto: CreateManufacturer,
  ): Promise<ManufacturerResponse> {
    const response = await this.manufacturerService.create(
      createManufacturerDto,
    );
    return { data: response };
  }

  @Get()
  @FilterQuery('query', QueryManufacturer)
  async find(
    @Query('query', QueryPipe<ManufacturerRelationTypes, Manufacturer>)
    query: QueryManufacturer,
  ): Promise<ManufacturersResponse> {
    const filter = filterEntity<ManufacturerRelationTypes, Manufacturer>(
      query,
      Manufacturer,
    );
    const response = await this.manufacturerService.find(filter);
    return { data: response };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ManufacturerResponse> {
    const response = await this.manufacturerService.findOne(id);
    return { data: response };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateManufacturer,
  ): Promise<ManufacturerResponse> {
    const response = await this.manufacturerService.update(id, payload);
    return { data: response };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(id);
  }
}
