import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Attribute,
  AttributeOption,
  Group,
  OptionConfig,
  Part,
} from '@/core/entities';
import { OptionConfigService } from './option-config.service';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Attribute,
      Group,
      Part,
      AttributeOption,
      OptionConfig,
    ]),
  ],
  controllers: [AttributeController, OptionController],
  providers: [AttributeService, OptionService, OptionConfigService],
  exports: [AttributeService, OptionService, OptionConfigService],
})
export class AttributeModule {}
