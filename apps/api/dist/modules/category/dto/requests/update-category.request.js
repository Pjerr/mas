"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategory = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_category_request_1 = require("./create-category.request");
class UpdateCategory extends (0, mapped_types_1.PartialType)(create_category_request_1.CreateCategory) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCategory = UpdateCategory;
//# sourceMappingURL=update-category.request.js.map