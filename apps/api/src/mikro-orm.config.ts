import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import path from 'path';

const dotenvConfig: DotenvConfigOutput = dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
if (dotenvConfig.error) {
  throw dotenvConfig.error;
}
const config: Options = {
  entities: [],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  name: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: 'postgresql',
  port: 5432,
  // debug: ['query', 'query-params'],
  verbose: true,
  driver: PostgreSqlDriver,
  migrations: {
    path: './apps/api/migrations',
  },
};

export default config;
