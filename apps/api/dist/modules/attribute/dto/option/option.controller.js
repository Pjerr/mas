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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const option_service_1 = require("./option.service");
const swagger_1 = require("@nestjs/swagger");
const query_pipe_1 = require("../../../../core/pipes/query.pipe");
const entities_1 = require("../../../../core/entities");
const types_1 = require("../../../../core/types");
const parse_query_1 = require("../../../../core/utils/parse-query");
const option_1 = require("./");
let OptionController = class OptionController {
    constructor(optionService) {
        this.optionService = optionService;
    }
    async create(payload) {
        const response = await this.optionService.create(payload);
        return { data: response };
    }
    async find(query) {
        const filter = (0, parse_query_1.filterEntity)(query, entities_1.AttributeOption);
        const response = await this.optionService.find(filter);
        return { data: response };
    }
    remove(id) {
        return this.optionService.remove(id);
    }
    removeMany(ids) {
        return this.optionService.removeMany(ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./option.response").OptionResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [option_1.CreateOption]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, types_1.FilterQuery)('query', option_1.QueryOption),
    openapi.ApiResponse({ status: 200, type: require("./option.response").OptionsResponse }),
    __param(0, (0, common_1.Query)('query', (query_pipe_1.QueryPipe))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [option_1.QueryOption]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "find", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], OptionController.prototype, "removeMany", null);
OptionController = __decorate([
    (0, swagger_1.ApiTags)('Options'),
    (0, common_1.Controller)('options'),
    __metadata("design:paramtypes", [typeof (_a = typeof option_service_1.OptionService !== "undefined" && option_service_1.OptionService) === "function" ? _a : Object])
], OptionController);
exports.OptionController = OptionController;
//# sourceMappingURL=option.controller.js.map