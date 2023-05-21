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
exports.Car = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
const shared_1 = require("shared");
const manufacturer_entity_1 = require("./manufacturer.entity");
const category_entity_1 = require("./category.entity");
const attribute_entity_1 = require("./attribute.entity");
const swagger_1 = require("@nestjs/swagger");
let Car = class Car extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.status = shared_1.CarStatus.InStock;
        this.attributes = new core_1.Collection(this);
        this.createdAt = new Date();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, status: { required: true, default: shared_1.CarStatus.InStock, enum: require("../../../../../packages/shared/dist/types/enums").CarStatus }, searchIndex: { required: true, type: () => String }, properties: { required: true, type: () => Object }, manufacturerId: { required: true, type: () => String }, categoryId: { required: true, type: () => String }, attributes: { required: true, type: () => Object, default: new core_1.Collection(this) }, createdAt: { required: true, type: () => Date, default: new Date() }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Car.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Car.prototype, "name", void 0);
__decorate([
    (0, core_1.Enum)(() => shared_1.CarStatus),
    __metadata("design:type", String)
], Car.prototype, "status", void 0);
__decorate([
    (0, core_1.Index)({ type: 'fulltext' }),
    (0, core_1.Property)({
        type: postgresql_1.FullTextType,
        onCreate: (car) => car.name,
        onUpdate: (cat) => cat.name,
    }),
    __metadata("design:type", String)
], Car.prototype, "searchIndex", void 0);
__decorate([
    (0, core_1.Property)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Car.prototype, "properties", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => manufacturer_entity_1.Manufacturer, { mapToPk: true }),
    __metadata("design:type", String)
], Car.prototype, "manufacturerId", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => category_entity_1.Category, { nullable: true, mapToPk: true }),
    __metadata("design:type", String)
], Car.prototype, "categoryId", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => attribute_entity_1.Attribute),
    (0, swagger_1.ApiResponseProperty)({
        type: [attribute_entity_1.Attribute],
    }),
    __metadata("design:type", Object)
], Car.prototype, "attributes", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Car.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Car.prototype, "updatedAt", void 0);
Car = __decorate([
    (0, core_1.Entity)()
], Car);
exports.Car = Car;
//# sourceMappingURL=car.entity.js.map