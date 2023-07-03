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
const entities_1 = require("../../../../core/entities");
const query_pipe_1 = require("../../../../core/pipes/query.pipe");
const types_1 = require("../../../../core/types");
const parse_query_1 = require("../../../../core/utils/parse-query");
const attribute_service_1 = require("./attribute.service");
const attribute_1 = require("./");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let AttributeController = class AttributeController {
    constructor(attributeService) {
        this.attributeService = attributeService;
    }
    async create(payload) {
        const response = await this.attributeService.create(payload);
        return { data: response };
    }
    async find(query) {
        const filter = (0, parse_query_1.filterEntity)(query, entities_1.Attribute);
        const response = await this.attributeService.find(filter);
        return { data: response };
    }
    async findOne(id) {
        const response = await this.attributeService.findOne(id);
        return { data: response };
    }
    async findByProduct(productId) {
        const response = await this.attributeService.findBy(productId);
        return { data: response };
    }
    async update(id, payload) {
        const response = await this.attributeService.update(id, payload);
        return { data: response };
    }
    removeMany(ids) {
        return this.attributeService.removeMany(ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./attribute.response").AttributeResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attribute_1.CreateAttribute]),
    __metadata("design:returntype", Promise)
], AttributeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, types_1.FilterQuery)('query', attribute_1.QueryAttribute),
    openapi.ApiResponse({ status: 200, type: require("./attribute.response").AttributesResponse }),
    __param(0, (0, common_1.Query)('query', (query_pipe_1.QueryPipe))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attribute_1.QueryAttribute]),
    __metadata("design:returntype", Promise)
], AttributeController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./attribute.response").AttributeResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttributeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/product'),
    openapi.ApiResponse({ status: 200, type: require("./attribute.response").PartialAttributesResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttributeController.prototype, "findByProduct", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./attribute.response").AttributeResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attribute_1.UpdateAttribute]),
    __metadata("design:returntype", Promise)
], AttributeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], AttributeController.prototype, "removeMany", null);
AttributeController = __decorate([
    (0, swagger_1.ApiTags)('Attributes'),
    (0, common_1.Controller)('attributes'),
    __metadata("design:paramtypes", [attribute_service_1.AttributeService])
], AttributeController);
exports.AttributeController = AttributeController;
//# sourceMappingURL=attribute.controller.js.map