"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeModule = void 0;
const common_1 = require("@nestjs/common");
const attribute_service_1 = require("./attribute.service");
const attribute_controller_1 = require("./attribute.controller");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../core/entities");
const option_config_service_1 = require("./option-config.service");
const option_controller_1 = require("./option.controller");
const option_service_1 = require("./option.service");
let AttributeModule = class AttributeModule {
};
AttributeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forFeature([
                entities_1.Attribute,
                entities_1.Group,
                entities_1.Part,
                entities_1.AttributeOption,
                entities_1.OptionConfig,
            ]),
        ],
        controllers: [attribute_controller_1.AttributeController, option_controller_1.OptionController],
        providers: [attribute_service_1.AttributeService, option_service_1.OptionService, option_config_service_1.OptionConfigService],
        exports: [attribute_service_1.AttributeService, option_service_1.OptionService, option_config_service_1.OptionConfigService],
    })
], AttributeModule);
exports.AttributeModule = AttributeModule;
//# sourceMappingURL=attribute.module.js.map