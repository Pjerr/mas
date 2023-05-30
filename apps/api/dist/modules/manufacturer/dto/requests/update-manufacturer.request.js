"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManufacturer = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_manufacturer_request_1 = require("./create-manufacturer.request");
class UpdateManufacturer extends (0, mapped_types_1.PartialType)(create_manufacturer_request_1.CreateManufacturer) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateManufacturer = UpdateManufacturer;
//# sourceMappingURL=update-manufacturer.request.js.map