import { Module, ValidationPipe } from '@nestjs/common';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Attribute, Category, Manufacturer, Part } from '@/core/entities';
import AttributeOption from '@/core/entities/attribute-option.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Part,
      Category,
      Attribute,
      AttributeOption,
      Manufacturer,
    ]),
  ],
  controllers: [PartController],
  providers: [PartService],
})
export class PartModule {}
