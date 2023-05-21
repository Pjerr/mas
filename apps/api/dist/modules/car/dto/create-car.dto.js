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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const shared_1 = require("shared");
class CreateCarDto {
    constructor() {
        this.status = shared_1.CarStatus.InStock;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, status: { required: false, default: shared_1.CarStatus.InStock, enum: require("../../../../../../packages/shared/dist/types/enums").CarStatus }, categoryId: { required: true, type: () => String }, attributeIds: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(shared_1.CarStatus),
    __metadata("design:type", String)
], CreateCarDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateCarDto.prototype, "attributeIds", void 0);
exports.CreateCarDto = CreateCarDto;
//# sourceMappingURL=create-car.dto.js.map