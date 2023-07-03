import { Module } from '@nestjs/common';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Attribute,
  AttributeOption,
  Category,
  Manufacturer,
  OptionConfig,
  Part,
  Variant,
} from '@/core/entities';
import { VariantService } from './variant.service';
import { OptionConfigService } from '../attribute/option-config.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Part,
      Category,
      Attribute,
      AttributeOption,
      Variant,
      OptionConfig,
    ]),
  ],
  controllers: [PartController],
  providers: [PartService, VariantService, OptionConfigService],
})
export class PartModule {}
