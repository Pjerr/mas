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
exports.Variant = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const entities_1 = require("./");
const filter_decorator_1 = require("../meta/decorators/filter.decorator");
const swagger_1 = require("@nestjs/swagger");
const uuid4_1 = __importDefault(require("uuid4"));
let Variant = class Variant extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid4_1.default)();
        this.optionsConfigs = new core_1.Collection(this);
        this.createdAt = new Date();
    }
    get price() {
        return this.optionsConfigs
            .toArray()
            .reduce((sum, config) => sum + config.price, this.part.basePrice);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid4_1.default)() }, part: { required: true, type: () => require("./part.entity").Part }, optionsConfigs: { required: true, type: () => Object, default: new core_1.Collection(this) }, createdAt: { required: true, type: () => Date, default: new Date() }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], Variant.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => entities_1.Part, { hidden: true }),
    __metadata("design:type", entities_1.Part)
], Variant.prototype, "part", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: [entities_1.OptionConfig] }),
    (0, core_1.ManyToMany)(() => entities_1.OptionConfig, (optionConfig) => optionConfig.variants, {
        nullable: true,
        cascade: [core_1.Cascade.PERSIST, core_1.Cascade.REMOVE],
    }),
    __metadata("design:type", Object)
], Variant.prototype, "optionsConfigs", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Variant.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Variant.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, core_1.Property)({ name: 'price', persist: false }),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Variant.prototype, "price", null);
Variant = __decorate([
    (0, core_1.Entity)()
], Variant);
exports.Variant = Variant;
//# sourceMappingURL=variant.entity.js.map