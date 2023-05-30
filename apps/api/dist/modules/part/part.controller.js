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
exports.PartController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const part_service_1 = require("./part.service");
const create_part_dto_1 = require("./dto/create-part.dto");
const update_part_request_1 = require("./dto/requests/update-part.request");
let PartController = class PartController {
    constructor(partService) {
        this.partService = partService;
    }
    create(createPartDto) {
        return this.partService.create(createPartDto);
    }
    findAll() {
        return this.partService.findAll();
    }
    findOne(id) {
        return this.partService.findOne(+id);
    }
    update(id, updatePartDto) {
        return this.partService.update(+id, updatePartDto);
    }
    remove(id) {
        return this.partService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_part_dto_1.CreatePartDto !== "undefined" && create_part_dto_1.CreatePartDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], PartController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PartController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_part_request_1.UpdatePart]),
    __metadata("design:returntype", void 0)
], PartController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartController.prototype, "remove", null);
PartController = __decorate([
    (0, common_1.Controller)('part'),
    __metadata("design:paramtypes", [part_service_1.PartService])
], PartController);
exports.PartController = PartController;
//# sourceMappingURL=part.controller.js.map