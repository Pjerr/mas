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
exports.Group = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
const swagger_1 = require("@nestjs/swagger");
const attribute_entity_1 = require("./attribute.entity");
const uuid4_1 = __importDefault(require("uuid4"));
let Group = class Group extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid4_1.default)();
        this.attributes = new core_1.Collection(this);
        this.createdAt = new Date();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid4_1.default)() }, name: { required: true, type: () => String }, searchIndex: { required: true, type: () => String }, attributes: { required: true, type: () => Object, default: new core_1.Collection(this) }, createdAt: { required: true, type: () => Date, default: new Date() }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Group.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, core_1.Index)({ type: 'fulltext' }),
    (0, core_1.Property)({
        type: postgresql_1.FullTextType,
        onCreate: (group) => group.name,
        onUpdate: (group) => group.name,
        nullable: true,
    }),
    __metadata("design:type", String)
], Group.prototype, "searchIndex", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: [attribute_entity_1.Attribute] }),
    (0, core_1.OneToMany)(() => attribute_entity_1.Attribute, (attribute) => attribute.group, {
        nullable: true,
        orphanRemoval: true,
        cascade: [core_1.Cascade.PERSIST],
    }),
    __metadata("design:type", Object)
], Group.prototype, "attributes", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Group.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Group.prototype, "updatedAt", void 0);
Group = __decorate([
    (0, core_1.Entity)()
], Group);
exports.Group = Group;
//# sourceMappingURL=group.entity.js.map