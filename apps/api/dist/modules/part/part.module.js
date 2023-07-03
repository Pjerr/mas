"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartModule = void 0;
const common_1 = require("@nestjs/common");
const part_service_1 = require("./part.service");
const part_controller_1 = require("./part.controller");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../core/entities");
const variant_service_1 = require("./variant.service");
const option_config_service_1 = require("../attribute/option-config.service");
let PartModule = class PartModule {
};
PartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forFeature([
                entities_1.Part,
                entities_1.Category,
                entities_1.Attribute,
                entities_1.AttributeOption,
                entities_1.Variant,
                entities_1.OptionConfig,
            ]),
        ],
        controllers: [part_controller_1.PartController],
        providers: [part_service_1.PartService, variant_service_1.VariantService, option_config_service_1.OptionConfigService],
    })
], PartModule);
exports.PartModule = PartModule;
//# sourceMappingURL=part.module.js.map