import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import path from 'path';
import {
  Attribute,
  Part,
  Category,
  Group,
  Manufacturer,
  AttributeOption,
  OptionConfig,
  GroupDocument,
} from './core/entities';
import { Variant } from './core/entities/variant.entity';
import { VariantConfig } from './core/entities/variant_config.entity';

const dotenvConfig: DotenvConfigOutput = dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}
const config: Options = {
  entities: [
    AttributeOption,
    Attribute,
    Group,
    Category,
    VariantConfig,
    GroupDocument,
    OptionConfig,
    Part,
    Manufacturer,
    Variant,
  ],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  name: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: 'postgresql',
  port: 5432,
  verbose: true,
  driver: PostgreSqlDriver,
  migrations: {
    path: './apps/api/migrations',
  },
};

export default config;
