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
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const uuid4_1 = __importDefault(require("uuid4"));
const attribute_entity_1 = require("./attribute.entity");
const filter_decorator_1 = require("../meta/decorators/filter.decorator");
const swagger_1 = require("@nestjs/swagger");
const option_config_entity_1 = require("./option-config.entity");
let AttributeOption = class AttributeOption extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid4_1.default)();
        this.createdAt = new Date();
        this.optionConfigs = new core_1.Collection(this);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid4_1.default)() }, value: { required: true, type: () => String }, displayName: { required: true, type: () => String }, attribute: { required: true, type: () => String }, createdAt: { required: true, type: () => Date, default: new Date() }, updatedAt: { required: true, type: () => Date }, optionConfigs: { required: true, type: () => Object, default: new core_1.Collection(this) } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "value", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, core_1.Unique)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "displayName", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => attribute_entity_1.Attribute, { mapToPk: true }),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "attribute", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], AttributeOption.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], AttributeOption.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [option_config_entity_1.OptionConfig] }),
    (0, core_1.OneToMany)(() => option_config_entity_1.OptionConfig, (optoinConfig) => optoinConfig.option, {
        orphanRemoval: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], AttributeOption.prototype, "optionConfigs", void 0);
AttributeOption = __decorate([
    (0, core_1.Entity)()
], AttributeOption);
exports.default = AttributeOption;
//# sourceMappingURL=attribute-option.entity.js.map