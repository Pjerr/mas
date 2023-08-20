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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_1 = require("@mikro-orm/nestjs");
const attribute_module_1 = require("./modules/attribute/attribute.module");
const category_module_1 = require("./modules/category/category.module");
const group_module_1 = require("./modules/group/group.module");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./config/configuration"));
const mikro_orm_service_1 = require("./config/mikro-orm.service");
const manufacturer_module_1 = require("./modules/manufacturer/manufacturer.module");
const part_module_1 = require("./modules/part/part.module");
const nestjs_cloudinary_1 = require("nestjs-cloudinary");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            nestjs_cloudinary_1.CloudinaryModule.forRoot({
                cloud_name: 'ditj6iih5',
                api_key: '286355945697816',
                api_secret: 'VpWzN1Ah7JlvbG8qq3iY1km2c6w',
            }),
            nestjs_1.MikroOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useClass: mikro_orm_service_1.MikroOrmService,
            }),
            attribute_module_1.AttributeModule,
            part_module_1.PartModule,
            category_module_1.CategoryModule,
            group_module_1.GroupModule,
            manufacturer_module_1.ManufacturerModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map