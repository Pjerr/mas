"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmService = void 0;
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const entities_1 = require("../core/entities");
const variant_config_entity_1 = require("../core/entities/variant_config.entity");
const variant_entity_1 = require("../core/entities/variant.entity");
let MikroOrmService = class MikroOrmService {
    constructor(configService) {
        this.configService = configService;
    }
    createMikroOrmOptions(contextName) {
        return Object.assign({ entities: [
                entities_1.AttributeOption,
                entities_1.Attribute,
                entities_1.Group,
                entities_1.Category,
                variant_config_entity_1.VariantConfig,
                entities_1.GroupDocument,
                entities_1.OptionConfig,
                entities_1.Part,
                entities_1.Manufacturer,
                variant_entity_1.Variant,
            ], driver: postgresql_1.PostgreSqlDriver, verbose: true, type: 'postgresql', debug: true }, this.configService.get('database'));
    }
};
MikroOrmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MikroOrmService);
exports.MikroOrmService = MikroOrmService;
//# sourceMappingURL=mikro-orm.service.js.map