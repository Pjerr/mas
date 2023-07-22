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
exports.OptionConfig = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const filter_decorator_1 = require("../meta/decorators/filter.decorator");
const uuid4_1 = __importDefault(require("uuid4"));
const swagger_1 = require("@nestjs/swagger");
const variant_entity_1 = require("./variant.entity");
const attribute_option_entity_1 = require("./attribute-option.entity");
const part_entity_1 = require("./part.entity");
let OptionConfig = class OptionConfig extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid4_1.default)();
        this.price = 0;
        this.createdAt = new Date();
        this.variants = new core_1.Collection(this);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid4_1.default)() }, price: { required: true, type: () => Number, default: 0 }, createdAt: { required: true, type: () => Date, default: new Date() }, updatedAt: { required: true, type: () => Date }, option: { required: true, type: () => require("./attribute-option.entity").AttributeOption }, variants: { required: true, type: () => Object, default: new core_1.Collection(this) }, part: { required: true, type: () => String } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], OptionConfig.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], OptionConfig.prototype, "price", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], OptionConfig.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], OptionConfig.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: () => attribute_option_entity_1.AttributeOption }),
    (0, core_1.ManyToOne)(() => attribute_option_entity_1.AttributeOption, { nullable: true }),
    __metadata("design:type", attribute_option_entity_1.AttributeOption)
], OptionConfig.prototype, "option", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: [variant_entity_1.Variant] }),
    (0, core_1.ManyToMany)(() => variant_entity_1.Variant),
    __metadata("design:type", Object)
], OptionConfig.prototype, "variants", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => part_entity_1.Part, { nullable: true, mapToPk: true }),
    __metadata("design:type", String)
], OptionConfig.prototype, "part", void 0);
OptionConfig = __decorate([
    (0, core_1.Entity)()
], OptionConfig);
exports.OptionConfig = OptionConfig;
//# sourceMappingURL=option-config.entity.js.map