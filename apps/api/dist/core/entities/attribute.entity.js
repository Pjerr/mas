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
const core_1 = require("@mikro-orm/core");
const postgresql_1 = require("@mikro-orm/postgresql");
const uuid4_1 = require("uuid4");
const shared_1 = require("shared");
const group_entity_1 = require("./group.entity");
const attribute_option_1 = __importDefault(require("./attribute-option"));
const swagger_1 = require("@nestjs/swagger");
const car_entity_1 = require("./car.entity");
const additional_metadata_1 = __importDefault(require("../types/additional-metadata"));
let Attribute = class Attribute extends core_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.id = uuid4_1.uuid4;
        this.editorType = shared_1.EditorType.Text;
        this.editorValidation = shared_1.EditorValidation.None;
        this.options = new core_1.Collection(this);
        this.cars = new core_1.Collection(this);
        this.createdAt = new Date();
    }
};
__decorate([
    (0, core_1.PrimaryKey)({ type: 'uuid' }),
    __metadata("design:type", String)
], Attribute.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    (0, core_1.Unique)(),
    __metadata("design:type", String)
], Attribute.prototype, "propertyKey", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Attribute.prototype, "displayName", void 0);
__decorate([
    (0, core_1.Index)({ type: 'fulltext' }),
    (0, core_1.Property)({
        type: postgresql_1.FullTextType,
        onUpdate: (attribute) => attribute.displayName,
        onCreate: (attribute) => attribute.displayName,
    }),
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
    __metadata("design:type", group_entity_1.Group)
], Attribute.prototype, "group", void 0);
__decorate([
    (0, core_1.OneToMany)(() => attribute_option_1.default, (option) => option.attributeId, {
        nullable: true,
        orphanRemoval: true,
        cascade: [core_1.Cascade.PERSIST],
    }),
    (0, swagger_1.ApiResponseProperty)({
        type: [attribute_option_1.default],
    }),
    __metadata("design:type", Object)
], Attribute.prototype, "options", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => car_entity_1.Car, (car) => car.attributes),
    (0, swagger_1.ApiResponseProperty)({
        type: [car_entity_1.Car],
    }),
    __metadata("design:type", Object)
], Attribute.prototype, "cars", void 0);
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