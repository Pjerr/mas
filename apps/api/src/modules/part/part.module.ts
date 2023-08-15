import { Module } from '@nestjs/common';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Attribute,
  AttributeOption,
  Category,
  OptionConfig,
  Part,
} from '@/core/entities';
import { VariantService } from './variant.service';
import { OptionConfigService } from '../attribute/option-config.service';
import { Variant } from '@/core/entities/variant.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Part,
      Category,
      Attribute,
      AttributeOption,
      OptionConfig,
      Variant,
    ]),
  ],
  controllers: [PartController],
  providers: [PartService, VariantService, OptionConfigService],
})
export class PartModule {}
