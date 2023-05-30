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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const option_service_1 = require("./option.service");
const create_option_request_1 = require("./dto/requests/create-option.request");
const update_option_request_1 = require("./dto/requests/update-option.request");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const types_1 = require("../../core/types");
const query_pipe_1 = require("../../core/pipes/query.pipe");
const attribute_option_1 = __importDefault(require("../../core/entities/attribute-option"));
const parse_query_1 = require("../../core/utils/parse-query");
let OptionController = class OptionController {
    constructor(optionService) {
        this.optionService = optionService;
    }
    async create(payload) {
        const response = await this.optionService.create(payload);
        return { data: response };
    }
    async find(query) {
        const filter = (0, parse_query_1.filterEntity)(query, attribute_option_1.default);
        const response = await this.optionService.find(filter);
        return { data: response };
    }
    async findOne(id) {
        const response = await this.optionService.findOne(id);
        return { data: response };
    }
    async update(id, payload) {
        const response = await this.optionService.update(id, payload);
        return { data: response };
    }
    remove(id) {
        return this.optionService.remove(id);
    }
    async updateRelation(id, payload) {
        const response = await this.optionService.updateAttributeRelation(id, payload.attributeId);
        return { data: response };
    }
    removeMany(ids) {
        return this.optionService.removeMany(ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/option.response").OptionResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_option_request_1.CreateOption]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, types_1.FilterQuery)('query', dto_1.QueryOption),
    openapi.ApiResponse({ status: 200, type: require("./dto/option.response").OptionsResponse }),
    __param(0, (0, common_1.Query)('query', (query_pipe_1.QueryPipe))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryOption]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/option.response").OptionResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/option.response").OptionResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_option_request_1.UpdateOption]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/relationships/attribute'),
    openapi.ApiResponse({ status: 200, type: require("./dto/option.response").OptionResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAttributeRelation]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "updateRelation", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "removeMany", null);
OptionController = __decorate([
    (0, swagger_1.ApiTags)('Attribute option'),
    (0, common_1.Controller)('option'),
    __metadata("design:paramtypes", [option_service_1.OptionService])
], OptionController);
exports.OptionController = OptionController;
//# sourceMappingURL=option.controller.js.map