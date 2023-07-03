"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOption = void 0;
const openapi = require("@nestjs/swagger");
const dto_1 = require("../../../../option/dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateOption extends (0, mapped_types_1.PartialType)(dto_1.CreateOption) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateOption = UpdateOption;
//# sourceMappingURL=update-option.request.js.map