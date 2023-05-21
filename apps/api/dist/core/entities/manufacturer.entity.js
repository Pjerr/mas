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
exports.Manufacturer = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const car_entity_1 = require("./car.entity");
let Manufacturer = class Manufacturer extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.cars = new core_1.Collection(this);
        this.createdAt = new Date();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, address: { required: true, type: () => String }, cars: { required: true, type: () => Object, default: new core_1.Collection(this) }, createdAt: { required: true, type: () => Date, default: new Date() }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Manufacturer.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Manufacturer.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Manufacturer.prototype, "address", void 0);
__decorate([
    (0, core_1.OneToMany)(() => car_entity_1.Car, (car) => car.manufacturerId, {
        nullable: true,
        orphanRemoval: true,
        cascade: [core_1.Cascade.PERSIST],
    }),
    __metadata("design:type", Object)
], Manufacturer.prototype, "cars", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Manufacturer.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Manufacturer.prototype, "updatedAt", void 0);
Manufacturer = __decorate([
    (0, core_1.Entity)()
], Manufacturer);
exports.Manufacturer = Manufacturer;
//# sourceMappingURL=manufacturer.entity.js.map