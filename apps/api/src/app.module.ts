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
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module';
import { PartModule } from './modules/part/part.module';
import { CloudinaryModule } from 'nestjs-cloudinary';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CloudinaryModule.forRoot({
      cloud_name: 'ditj6iih5',
      api_key: '286355945697816',
      api_secret: 'VpWzN1Ah7JlvbG8qq3iY1km2c6w',
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: MikroOrmService,
    }),
    AttributeModule,
    PartModule,
    CategoryModule,
    GroupModule,
    ManufacturerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
