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
const filter_decorator_1 = require("../meta/decorators/filter.decorator");
const uuid4_1 = __importDefault(require("uuid4"));
const part_entity_1 = require("./part.entity");
let Variant = class Variant extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid4_1.default)();
        this.disabled = false;
        this.createdAt = new Date();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid4_1.default)() }, price: { required: true, type: () => Number }, disabled: { required: true, type: () => Boolean, default: false }, properties: { required: true, type: () => Object }, part: { required: true, type: () => String }, createdAt: { required: true, type: () => Date, default: new Date() } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], Variant.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", Number)
], Variant.prototype, "price", void 0);
__decorate([
    (0, core_1.Property)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], Variant.prototype, "disabled", void 0);
__decorate([
    (0, core_1.Property)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Variant.prototype, "properties", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => part_entity_1.Part, { mapToPk: true, onDelete: 'cascade' }),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], Variant.prototype, "part", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Variant.prototype, "createdAt", void 0);
Variant = __decorate([
    (0, core_1.Entity)()
], Variant);
exports.Variant = Variant;
//# sourceMappingURL=variant.entity.js.map