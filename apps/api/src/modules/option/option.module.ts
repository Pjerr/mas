import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import AttributeOption from '@/core/entities/attribute-option.entity';
import { Attribute } from '@/core/entities';

@Module({
  imports: [MikroOrmModule.forFeature([AttributeOption, Attribute])],
  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
