"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturersResponse = exports.ManufacturerResponse = void 0;
const openapi = require("@nestjs/swagger");
class ManufacturerResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../core/entities/manufacturer.entity").Manufacturer } };
    }
}
exports.ManufacturerResponse = ManufacturerResponse;
class ManufacturersResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../core/entities/manufacturer.entity").Manufacturer] } };
    }
}
exports.ManufacturersResponse = ManufacturersResponse;
//# sourceMappingURL=manufacturer.response.js.map