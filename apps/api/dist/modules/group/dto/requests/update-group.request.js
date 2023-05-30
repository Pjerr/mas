"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGroup = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_group_request_1 = require("./create-group.request");
class UpdateGroup extends (0, mapped_types_1.PartialType)(create_group_request_1.CreateGroup) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateGroup = UpdateGroup;
//# sourceMappingURL=update-group.request.js.map