import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from '@mikro-orm/core';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { Connection } from '@mikro-orm/core/connections';
import { IDatabaseDriver } from '@mikro-orm/core/drivers';
import {
  Variant,
  Attribute,
  Group,
  AttributeOption,
  Category,
  OptionConfig,
  Part,
  Manufacturer,
} from '@/core/entities';

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
        Attribute,
        Group,
        Category,
        Variant,
        Part,
        AttributeOption,
        OptionConfig,
        Manufacturer,
      ],
      driver: PostgreSqlDriver,
      verbose: true,
      type: 'postgresql',
      debug: true,

      ...this.configService.get<ConnectionOptions>('database'),
    };
  }
}
