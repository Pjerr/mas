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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const manufacturer_service_1 = require("./manufacturer.service");
const create_manufacturer_dto_1 = require("./dto/create-manufacturer.dto");
const update_manufacturer_dto_1 = require("./dto/update-manufacturer.dto");
const swagger_1 = require("@nestjs/swagger");
let ManufacturerController = class ManufacturerController {
    constructor(manufacturerService) {
        this.manufacturerService = manufacturerService;
    }
    create(createManufacturerDto) {
        return this.manufacturerService.create(createManufacturerDto);
    }
    findAll() {
        return this.manufacturerService.findAll();
    }
    findOne(id) {
        return this.manufacturerService.findOne(id);
    }
    update(id, updateManufacturerDto) {
        return this.manufacturerService.update(id, updateManufacturerDto);
    }
    remove(id) {
        return this.manufacturerService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../core/entities/manufacturer.entity").Manufacturer }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manufacturer_dto_1.CreateManufacturerDto]),
    __metadata("design:returntype", void 0)
], ManufacturerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ManufacturerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManufacturerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_manufacturer_dto_1.UpdateManufacturerDto]),
    __metadata("design:returntype", void 0)
], ManufacturerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManufacturerController.prototype, "remove", null);
ManufacturerController = __decorate([
    (0, swagger_1.ApiTags)('Manufacturer'),
    (0, common_1.Controller)('manufacturer'),
    __metadata("design:paramtypes", [manufacturer_service_1.ManufacturerService])
], ManufacturerController);
exports.ManufacturerController = ManufacturerController;
//# sourceMappingURL=manufacturer.controller.js.map