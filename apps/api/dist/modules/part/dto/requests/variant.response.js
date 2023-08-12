"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantsResponse = exports.Variants = void 0;
const openapi = require("@nestjs/swagger");
class Variants {
    static _OPENAPI_METADATA_FACTORY() {
        return { configs: { required: true, type: () => [[require("../../../attribute/dto/option/requests/config.response").VariantConfigResponse]] }, basePrice: { required: true, type: () => Number }, part: { required: true, type: () => String } };
    }
}
exports.Variants = Variants;
class VariantsResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("./variant.response").Variants }, links: { required: false, type: () => [String] } };
    }
}
exports.VariantsResponse = VariantsResponse;
//# sourceMappingURL=variant.response.js.map