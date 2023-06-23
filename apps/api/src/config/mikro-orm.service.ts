import {
  Attribute,
  Part,
  Category,
  Group,
  Manufacturer,
} from '@/core/entities';
import AttributeOption from '@/core/entities/attribute-option.entity';
import {
  IDatabaseDriver,
  Connection,
  ConnectionOptions,
} from '@mikro-orm/core';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MikroOrmService implements MikroOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMikroOrmOptions(
    contextName?: string,
  ):
    | MikroOrmModuleOptions<IDatabaseDriver<Connection>>
    | Promise<MikroOrmModuleOptions<IDatabaseDriver<Connection>>> {
    return {
      entities: [
        Part,
        Attribute,
        AttributeOption,
        Manufacturer,
        Category,
        Group,
      ],
      driver: PostgreSqlDriver,
      verbose: true,
      type: 'postgresql',
      debug: true,
      ...this.configService.get<ConnectionOptions>('database'),
    };
  }
}
