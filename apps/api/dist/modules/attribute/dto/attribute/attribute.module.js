"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeModule = void 0;
const common_1 = require("@nestjs/common");
const attribute_service_1 = require("./attribute.service");
const attribute_controller_1 = require("./attribute.controller");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../../../core/entities");
const attribute_option_entity_1 = __importDefault(require("../../../../core/entities/attribute-option.entity"));
let AttributeModule = class AttributeModule {
};
AttributeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forFeature([entities_1.Attribute, entities_1.Group, entities_1.Part, attribute_option_entity_1.default]),
        ],
        controllers: [attribute_controller_1.AttributeController],
        providers: [attribute_service_1.AttributeService],
        exports: [attribute_service_1.AttributeService],
    })
], AttributeModule);
exports.AttributeModule = AttributeModule;
//# sourceMappingURL=attribute.module.js.map