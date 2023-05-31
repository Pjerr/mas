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
var Category_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
const swagger_1 = require("@nestjs/swagger");
const uuid4_1 = __importDefault(require("uuid4"));
let Category = Category_1 = class Category extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid4_1.default)();
        this.children = new core_1.Collection(this);
        this.createdAt = new Date();
    }
    get childrenIds() {
        return this.children.isInitialized() ? this.children.getIdentifiers() : [];
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid4_1.default)() }, name: { required: true, type: () => String }, searchIndex: { required: true, type: () => String }, parentId: { required: true, type: () => String }, createdAt: { required: true, type: () => Date, default: new Date() }, updatedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, core_1.Index)({ type: 'fulltext' }),
    (0, core_1.Property)({
        type: postgresql_1.FullTextType,
        onCreate: (category) => category.name,
        onUpdate: (category) => category.name,
    }),
    __metadata("design:type", String)
], Category.prototype, "searchIndex", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Category_1, { nullable: true, mapToPk: true }),
    __metadata("design:type", String)
], Category.prototype, "parentId", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    (0, core_1.OneToMany)(() => Category_1, (category) => category.parentId, {
        orphanRemoval: true,
        cascade: [core_1.Cascade.PERSIST],
    }),
    __metadata("design:type", Object)
], Category.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, core_1.Property)({ name: 'children_ids', persist: false }),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], Category.prototype, "childrenIds", null);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
Category = Category_1 = __decorate([
    (0, core_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map