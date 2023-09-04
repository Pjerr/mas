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
exports.AttributeDocument = exports.GroupDocument = void 0;
const openapi = require("@nestjs/swagger");
const entities_1 = require("./");
const core_1 = require("@mikro-orm/core");
let GroupDocument = class GroupDocument {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, attributes: { required: false, type: () => [require("./group-document.entity").AttributeDocument] } };
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], GroupDocument.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], GroupDocument.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)({ name: 'attributes' }),
    __metadata("design:type", Array)
], GroupDocument.prototype, "attributes", void 0);
GroupDocument = __decorate([
    (0, core_1.Entity)({
        virtual: true,
        expression: (em, where, options) => {
            return em.find(entities_1.Group, Object.assign({}, where), {
                populate: ['attributes'],
                fields: ['id', 'name', 'attributes.displayName', 'attributes.id'],
            });
        },
    })
], GroupDocument);
exports.GroupDocument = GroupDocument;
class AttributeDocument {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, displayName: { required: true, type: () => String } };
    }
}
__decorate([
    (0, core_1.Property)({ name: 'attributes.id' }),
    __metadata("design:type", String)
], AttributeDocument.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)({ name: 'attributes.displayName' }),
    __metadata("design:type", String)
], AttributeDocument.prototype, "displayName", void 0);
exports.AttributeDocument = AttributeDocument;
//# sourceMappingURL=group-document.entity.js.map