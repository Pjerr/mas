"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartsResponse = exports.PartResponse = void 0;
const openapi = require("@nestjs/swagger");
class PartResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../core/entities/part.entity").Part }, variantConfigs: { required: false, type: () => [[require("../../../core/entities/option-config.entity").OptionConfig]] } };
    }
}
exports.PartResponse = PartResponse;
class PartsResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../core/entities/part.entity").Part] } };
    }
}
exports.PartsResponse = PartsResponse;
//# sourceMappingURL=part.response.js.map