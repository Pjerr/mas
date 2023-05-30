import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Attribute, Group, Part } from '@/core/entities';
import AttributeOption from '@/core/entities/attribute-option';

@Module({
  imports: [
    MikroOrmModule.forFeature([Attribute, Group, Part, AttributeOption]),
  ],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService],
})
export class AttributeModule {}
