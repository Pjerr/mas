"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOption = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_option_request_1 = require("./create-option.request");
class UpdateOption extends (0, mapped_types_1.PartialType)(create_option_request_1.CreateOption) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateOption = UpdateOption;
//# sourceMappingURL=update-option.request.js.map