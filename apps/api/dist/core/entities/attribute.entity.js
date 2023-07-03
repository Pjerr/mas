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
exports.Attribute = void 0;
const openapi = require("@nestjs/swagger");
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
const uuid4_1 = __importDefault(require("uuid4"));
const shared_1 = require("shared");
const group_entity_1 = require("./group.entity");
const swagger_1 = require("@nestjs/swagger");
const part_entity_1 = require("./part.entity");
const additional_metadata_1 = __importDefault(require("../types/additional-metadata"));
const filter_decorator_1 = require("../meta/decorators/filter.decorator");
const attribute_option_entity_1 = require("./attribute-option.entity");
let Attribute = class Attribute extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = (0, uuid4_1.default)();
        this.editorType = shared_1.EditorType.Text;
        this.editorValidation = shared_1.EditorValidation.None;
        this.options = new core_1.Collection(this);
        this.parts = new core_1.Collection(this);
        this.createdAt = new Date();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid4_1.default)() }, propertyKey: { required: true, type: () => String }, displayName: { required: true, type: () => String }, searchIndex: { required: true, type: () => String }, editorType: { required: true, type: () => Object, default: shared_1.EditorType.Text, enum: require("../../../../../packages/shared/dist/types/enums").EditorType }, editorValidation: { required: true, type: () => Object, default: shared_1.EditorValidation.None, enum: require("../../../../../packages/shared/dist/types/enums").EditorValidation }, group: { required: true, type: () => require("./group.entity").Group }, options: { required: true, type: () => Object, default: new core_1.Collection(this) }, parts: { required: true, type: () => Object, default: new core_1.Collection(this) }, createdAt: { required: true, type: () => Date, default: new Date() }, updatedAt: { required: true, type: () => Date }, additionalMetadata: { required: false, type: () => require("../types/additional-metadata").default } };
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], Attribute.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, filter_decorator_1.Filterable)(),
    (0, core_1.Unique)(),
    __metadata("design:type", String)
], Attribute.prototype, "propertyKey", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], Attribute.prototype, "displayName", void 0);
__decorate([
    (0, core_1.Index)({ type: 'fulltext' }),
    (0, core_1.Property)({
        type: postgresql_1.FullTextType,
        onUpdate: (attribute) => attribute.displayName,
        onCreate: (attribute) => attribute.displayName,
    }),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", String)
], Attribute.prototype, "searchIndex", void 0);
__decorate([
    (0, core_1.Enum)(() => shared_1.EditorType),
    __metadata("design:type", Object)
], Attribute.prototype, "editorType", void 0);
__decorate([
    (0, core_1.Enum)(() => shared_1.EditorValidation),
    __metadata("design:type", Object)
], Attribute.prototype, "editorValidation", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => group_entity_1.Group),
    (0, filter_decorator_1.Filterable)(),
    __metadata("design:type", group_entity_1.Group)
], Attribute.prototype, "group", void 0);
__decorate([
    (0, core_1.OneToMany)(() => attribute_option_entity_1.AttributeOption, (option) => option.attribute, {
        nullable: true,
        orphanRemoval: true,
        cascade: [core_1.Cascade.PERSIST],
    }),
    (0, filter_decorator_1.Filterable)(),
    (0, swagger_1.ApiResponseProperty)({
        type: [attribute_option_entity_1.AttributeOption],
    }),
    __metadata("design:type", Object)
], Attribute.prototype, "options", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => part_entity_1.Part, (part) => part.attributes),
    (0, filter_decorator_1.Filterable)(),
    (0, swagger_1.ApiResponseProperty)({
        type: [part_entity_1.Part],
    }),
    __metadata("design:type", Object)
], Attribute.prototype, "parts", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Attribute.prototype, "createdAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Attribute.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.Property)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", additional_metadata_1.default)
], Attribute.prototype, "additionalMetadata", void 0);
Attribute = __decorate([
    (0, core_1.Entity)()
], Attribute);
exports.Attribute = Attribute;
//# sourceMappingURL=attribute.entity.js.map