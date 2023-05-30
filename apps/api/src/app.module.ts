import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AttributeModule } from './modules/attribute/attribute.module';
import { CategoryModule } from './modules/category/category.module';
import { GroupModule } from './modules/group/group.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MikroOrmService } from './config/mikro-orm.service';
import { OptionModule } from './modules/option/option.module';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module';
import { PartModule } from './modules/part/part.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: MikroOrmService,
    }),
    AttributeModule,
    PartModule,
    CategoryModule,
    GroupModule,
    OptionModule,
    ManufacturerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
