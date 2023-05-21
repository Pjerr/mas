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
const core_1 = require("@mikro-orm/core");
const uuid4_1 = require("uuid4");
const attribute_entity_1 = require("./attribute.entity");
let AttributeOption = class AttributeOption extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid4_1.uuid4)();
        this.createdAt = new Date();
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], AttributeOption.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "value", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Number)
], AttributeOption.prototype, "additionalPrice", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, core_1.Unique)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "sku", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, core_1.Unique)(),
    __metadata("design:type", String)
], AttributeOption.prototype, "displayName", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => attribute_entity_1.Attribute, { mapToPk: true }),
    __metadata("design:type", String)
], AttributeOption.prototype, "attributeId", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], AttributeOption.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], AttributeOption.prototype, "updatedAt", void 0);
AttributeOption = __decorate([
    (0, core_1.Entity)()
], AttributeOption);
exports.default = AttributeOption;
//# sourceMappingURL=attribute-option.js.map