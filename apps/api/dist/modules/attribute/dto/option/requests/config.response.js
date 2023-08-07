"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantConfigResponse = void 0;
const openapi = require("@nestjs/swagger");
class VariantConfigResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { price: { required: true, type: () => Number }, id: { required: true, type: () => String }, attributeName: { required: true, type: () => String }, optionValue: { required: true, type: () => String } };
    }
}
exports.VariantConfigResponse = VariantConfigResponse;
//# sourceMappingURL=config.response.js.map