"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerModule = void 0;
const common_1 = require("@nestjs/common");
const manufacturer_service_1 = require("./manufacturer.service");
const manufacturer_controller_1 = require("./manufacturer.controller");
const nestjs_1 = require("@mikro-orm/nestjs");
const entities_1 = require("../../core/entities");
let ManufacturerModule = class ManufacturerModule {
};
ManufacturerModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature([entities_1.Manufacturer])],
        controllers: [manufacturer_controller_1.ManufacturerController],
        providers: [manufacturer_service_1.ManufacturerService],
    })
], ManufacturerModule);
exports.ManufacturerModule = ManufacturerModule;
//# sourceMappingURL=manufacturer.module.js.map