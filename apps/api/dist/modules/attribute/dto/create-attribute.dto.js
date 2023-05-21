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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttributeDto = void 0;
const openapi = require("@nestjs/swagger");
const additional_metadata_1 = __importDefault(require("../../../core/types/additional-metadata"));
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const shared_1 = require("shared");
class CreateAttributeDto {
    constructor() {
        this.editorType = shared_1.EditorType.Text;
        this.editorValidation = shared_1.EditorValidation.None;
        this.additionalMetadata = { selectOptions: [] };
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { propertyKey: { required: false, type: () => String }, displayName: { required: true, type: () => String }, editorType: { required: true, default: shared_1.EditorType.Text, enum: require("../../../../../../packages/shared/dist/types/enums").EditorType }, editorValidation: { required: true, default: shared_1.EditorValidation.None, enum: require("../../../../../../packages/shared/dist/types/enums").EditorValidation }, groupId: { required: true, type: () => String }, additionalMetadata: { required: false, type: () => require("../../../core/types/additional-metadata").default, default: { selectOptions: [] } } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAttributeDto.prototype, "propertyKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAttributeDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(shared_1.EditorType),
    __metadata("design:type", String)
], CreateAttributeDto.prototype, "editorType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(shared_1.EditorValidation),
    __metadata("design:type", String)
], CreateAttributeDto.prototype, "editorValidation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateAttributeDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", additional_metadata_1.default)
], CreateAttributeDto.prototype, "additionalMetadata", void 0);
exports.CreateAttributeDto = CreateAttributeDto;
//# sourceMappingURL=create-attribute.dto.js.map