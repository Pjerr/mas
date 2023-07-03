"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsResponse = exports.OptionResponse = void 0;
const openapi = require("@nestjs/swagger");
class OptionResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../../core/entities/attribute-option.entity").AttributeOption }, links: { required: false, type: () => [String] } };
    }
}
exports.OptionResponse = OptionResponse;
class OptionsResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../../core/entities/attribute-option.entity").AttributeOption] }, links: { required: false, type: () => [String] } };
    }
}
exports.OptionsResponse = OptionsResponse;
//# sourceMappingURL=option.response.js.map