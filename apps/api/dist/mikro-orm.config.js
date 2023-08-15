"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const entities_1 = require("./core/entities");
const variant_entity_1 = require("./core/entities/variant.entity");
const dotenvConfig = dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
if (dotenvConfig.error) {
    throw dotenvConfig.error;
}
const config = {
    entities: [
        entities_1.Attribute,
        entities_1.AttributeOption,
        entities_1.Part,
        entities_1.Manufacturer,
        entities_1.Group,
        entities_1.Category,
        entities_1.OptionConfig,
        variant_entity_1.Variant,
    ],
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