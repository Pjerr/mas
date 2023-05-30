"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttributeRelations = exports.UpdateAttributeRelation = void 0;
const openapi = require("@nestjs/swagger");
class UpdateAttributeRelation {
    static _OPENAPI_METADATA_FACTORY() {
        return { attributeId: { required: true, type: () => String } };
    }
}
exports.UpdateAttributeRelation = UpdateAttributeRelation;
class UpdateAttributeRelations {
    static _OPENAPI_METADATA_FACTORY() {
        return { attributeIds: { required: true, type: () => [String] } };
    }
}
exports.UpdateAttributeRelations = UpdateAttributeRelations;
//# sourceMappingURL=update-attribute-relation.request.js.map