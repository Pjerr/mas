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
exports.AttributeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const attribute_service_1 = require("./attribute.service");
const create_attribute_dto_1 = require("./dto/create-attribute.dto");
const update_attribute_dto_1 = require("./dto/update-attribute.dto");
const swagger_1 = require("@nestjs/swagger");
let AttributeController = class AttributeController {
    constructor(attributeService) {
        this.attributeService = attributeService;
    }
    create(createAttributeDto) {
        return this.attributeService.create(createAttributeDto);
    }
    findAll() {
        return this.attributeService.findAll();
    }
    findOne(id) {
        return this.attributeService.findOne(id);
    }
    update(id, updateAttributeDto) {
        return this.attributeService.update(id, updateAttributeDto);
    }
    remove(id) {
        return this.attributeService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../core/entities/attribute.entity").Attribute }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_dto_1.CreateAttributeDto]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_dto_1.UpdateAttributeDto]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "remove", null);
AttributeController = __decorate([
    (0, swagger_1.ApiTags)('Attribute'),
    (0, common_1.Controller)('attribute'),
    __metadata("design:paramtypes", [attribute_service_1.AttributeService])
], AttributeController);
exports.AttributeController = AttributeController;
//# sourceMappingURL=attribute.controller.js.map