"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dotenvConfig = dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
if (dotenvConfig.error) {
    throw dotenvConfig.error;
}
const config = {
    entities: [],
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    name: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: 'postgresql',
    port: 5432,
    verbose: true,
    driver: postgresql_1.PostgreSqlDriver,
    migrations: {
        path: './apps/api/migrations',
    },
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map