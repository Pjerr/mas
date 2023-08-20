"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantResponse = exports.VariantsResponse = exports.Variants = void 0;
const openapi = require("@nestjs/swagger");
class Variants {
    static _OPENAPI_METADATA_FACTORY() {
        return { configs: { required: true, type: () => [[require("../../../attribute/dto/option/requests/config.response").VariantConfigResponse]] }, basePrice: { required: true, type: () => Number }, part: { required: true, type: () => String } };
    }
}
exports.Variants = Variants;
class VariantsResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../../core/entities/variant.entity").Variant] } };
    }
}
exports.VariantsResponse = VariantsResponse;
class VariantResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../../core/entities/variant.entity").Variant } };
    }
}
exports.VariantResponse = VariantResponse;
//# sourceMappingURL=variant.response.js.map