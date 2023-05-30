"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePart = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_part_request_1 = require("./create-part.request");
class UpdatePart extends (0, mapped_types_1.PartialType)(create_part_request_1.CreatePart) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePart = UpdatePart;
//# sourceMappingURL=update-part.request.js.map