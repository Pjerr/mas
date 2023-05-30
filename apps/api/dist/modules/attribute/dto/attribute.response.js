"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributesResponse = exports.PartialAttributesResponse = exports.AttributeResponse = void 0;
const openapi = require("@nestjs/swagger");
class AttributeResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../core/entities/attribute.entity").Attribute }, links: { required: false, type: () => [String] } };
    }
}
exports.AttributeResponse = AttributeResponse;
class AttributeByCar {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, propertyKey: { required: true, type: () => String }, displayName: { required: true, type: () => String } };
    }
}
class PartialAttributesResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [AttributeByCar] }, links: { required: false, type: () => [String] } };
    }
}
exports.PartialAttributesResponse = PartialAttributesResponse;
class AttributesResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../core/entities/attribute.entity").Attribute] }, links: { required: false, type: () => [String] } };
    }
}
exports.AttributesResponse = AttributesResponse;
//# sourceMappingURL=attribute.response.js.map