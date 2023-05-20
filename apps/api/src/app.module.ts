import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AttributeModule } from './modules/attribute/attribute.module';
import { CarModule } from './modules/car/car.module';
import { CategoryModule } from './modules/category/category.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: 'postgres',
      type: 'postgresql',
    }),
    AttributeModule,
    CarModule,
    CategoryModule,
    GroupModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
