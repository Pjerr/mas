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
exports.PartController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const part_service_1 = require("./part.service");
const update_part_request_1 = require("./dto/requests/update-part.request");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const types_1 = require("../../core/types");
const query_pipe_1 = require("../../core/pipes/query.pipe");
const entities_1 = require("../../core/entities");
const parse_query_1 = require("../../core/utils/parse-query");
let PartController = class PartController {
    constructor(partService) {
        this.partService = partService;
    }
    async create(request) {
        const part = await this.partService.create(request);
        return { data: part };
    }
    async createDraft(request) {
        const response = await this.partService.createDraft(request);
        return { data: response };
    }
    async find(query) {
        const filter = (0, parse_query_1.filterEntity)(query, entities_1.Part);
        const response = await this.partService.find(filter);
        return { data: response };
    }
    async findOne(id) {
        const response = await this.partService.findOne(id);
        return { data: response };
    }
    async bulkUpdatePrice(ids, request) {
        const response = await this.partService.bulkUpdatePrice(ids, request.payloads);
        return { data: response };
    }
    async update(id, payload) {
        const part = await this.partService.update(id, payload);
        return { data: part };
    }
    async addCategory(id, payload) {
        const response = await this.partService.addCategory(id, payload.categoryId);
        return { data: response };
    }
    async addAttribute(id, payload) {
        const response = await this.partService.addAttribute(id, payload.attributeId);
        return { data: response };
    }
    async removeAttribute(id, payload) {
        const response = await this.partService.removeAttribute(id, payload.attributeId);
        return { data: response };
    }
    async removeAttributes(id, payload) {
        const response = await this.partService.removeAttributes(id, payload.attributeIds);
        return { data: response };
    }
    remove(id) {
        return this.partService.remove(id);
    }
    removeMany(ids) {
        return this.partService.removeMany(ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/part.response").PartResponse }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePart]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('draft'),
    openapi.ApiResponse({ status: 201, type: require("./dto/part.response").PartResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateDraft]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "createDraft", null);
__decorate([
    (0, common_1.Get)(),
    (0, types_1.FilterQuery)('query', dto_1.QueryPart),
    openapi.ApiResponse({ status: 200, type: require("./dto/part.response").PartsResponse }),
    __param(0, (0, common_1.Query)('query', (query_pipe_1.QueryPipe))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryPart]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/part.response").PartResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('bulk-update'),
    openapi.ApiResponse({ status: 200, type: require("./dto/part.response").PartsResponse }),
    __param(0, (0, common_1.Query)('ids')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, dto_1.BulkUpdatePrice]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "bulkUpdatePrice", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/part.response").PartResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_part_request_1.UpdatePart]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/relationships/category'),
    openapi.ApiResponse({ status: 200, type: require("./dto/part.response").PartResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCategoryRelation]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "addCategory", null);
__decorate([
    (0, common_1.Patch)(':id/relationships/attribute'),
    openapi.ApiResponse({ status: 200, type: require("./dto/part.response").PartResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAttributeRelation]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "addAttribute", null);
__decorate([
    (0, common_1.Delete)(':id/relationships/attribute'),
    openapi.ApiResponse({ status: 200, type: require("./dto/part.response").PartResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAttributeRelation]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "removeAttribute", null);
__decorate([
    (0, common_1.Delete)(':id/relationships/attributes'),
    openapi.ApiResponse({ status: 200, type: require("./dto/part.response").PartResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAttributeRelations]),
    __metadata("design:returntype", Promise)
], PartController.prototype, "removeAttributes", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PartController.prototype, "removeMany", null);
PartController = __decorate([
    (0, swagger_1.ApiTags)('Parts'),
    (0, common_1.Controller)('parts'),
    __metadata("design:paramtypes", [part_service_1.PartService])
], PartController);
exports.PartController = PartController;
//# sourceMappingURL=part.controller.js.map