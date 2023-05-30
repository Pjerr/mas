import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Manufacturer } from '@/core/entities';

@Module({
  imports: [MikroOrmModule.forFeature([Manufacturer])],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
})
export class ManufacturerModule {}
