import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturer } from './dto/requests/create-manufacturer.request';
import { UpdateManufacturer } from './dto/requests/update-manufacturer.request';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Manufacturer')
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  create(@Body() createManufacturerDto: CreateManufacturer) {
    return this.manufacturerService.create(createManufacturerDto);
  }

  @Get()
  findAll() {
    return this.manufacturerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturer,
  ) {
    return this.manufacturerService.update(id, updateManufacturerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(id);
  }
}
