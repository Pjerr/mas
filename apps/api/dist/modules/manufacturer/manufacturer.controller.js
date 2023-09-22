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
const create_manufacturer_request_1 = require("./dto/requests/create-manufacturer.request");
const update_manufacturer_request_1 = require("./dto/requests/update-manufacturer.request");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const types_1 = require("../../core/types");
const entities_1 = require("../../core/entities");
const query_pipe_1 = require("../../core/pipes/query.pipe");
const parse_query_1 = require("../../core/utils/parse-query");
const guards_1 = require("../auth/guards");
let ManufacturerController = class ManufacturerController {
    constructor(manufacturerService) {
        this.manufacturerService = manufacturerService;
    }
    async create(createManufacturerDto) {
        const response = await this.manufacturerService.create(createManufacturerDto);
        return { data: response };
    }
    async find(query) {
        const filter = (0, parse_query_1.filterEntity)(query, entities_1.Manufacturer);
        const response = await this.manufacturerService.find(filter);
        return { data: response };
    }
    async findOne(id) {
        const response = await this.manufacturerService.findOne(id);
        return { data: response };
    }
    async update(id, payload) {
        const response = await this.manufacturerService.update(id, payload);
        return { data: response };
    }
    remove(id) {
        return this.manufacturerService.remove(id);
    }
    removeMany(ids) {
        return this.manufacturerService.removeMany(ids);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./dto/manufacturer.response").ManufacturerResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manufacturer_request_1.CreateManufacturer]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, types_1.FilterQuery)('query', dto_1.QueryManufacturer),
    openapi.ApiResponse({ status: 200, type: require("./dto/manufacturer.response").ManufacturersResponse }),
    __param(0, (0, common_1.Query)('query', (query_pipe_1.QueryPipe))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryManufacturer]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/manufacturer.response").ManufacturerResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./dto/manufacturer.response").ManufacturerResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_manufacturer_request_1.UpdateManufacturer]),
    __metadata("design:returntype", Promise)
], ManufacturerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ManufacturerController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ManufacturerController.prototype, "removeMany", null);
ManufacturerController = __decorate([
    (0, swagger_1.ApiTags)('Manufacturers'),
    (0, common_1.Controller)('manufacturers'),
    (0, common_1.UseGuards)(new guards_1.AuthGuard(), guards_1.RolesGuard),
    __metadata("design:paramtypes", [manufacturer_service_1.ManufacturerService])
], ManufacturerController);
exports.ManufacturerController = ManufacturerController;
//# sourceMappingURL=manufacturer.controller.js.map