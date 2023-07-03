"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialAttributesResponse = exports.AttributesResponse = exports.AttributeResponse = void 0;
const openapi = require("@nestjs/swagger");
class AttributeResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../../core/entities/attribute.entity").Attribute }, links: { required: false, type: () => [String] } };
    }
}
exports.AttributeResponse = AttributeResponse;
class AttributesResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../../core/entities/attribute.entity").Attribute] }, links: { required: false, type: () => [String] } };
    }
}
exports.AttributesResponse = AttributesResponse;
class AttributeByPart {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, propertyKey: { required: true, type: () => String }, displayName: { required: true, type: () => String } };
    }
}
class PartialAttributesResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [AttributeByPart] }, links: { required: false, type: () => [String] } };
    }
}
exports.PartialAttributesResponse = PartialAttributesResponse;
//# sourceMappingURL=attribute.response.js.map