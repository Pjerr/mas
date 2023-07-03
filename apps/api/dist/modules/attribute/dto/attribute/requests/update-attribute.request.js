"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttribute = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_attribute_request_1 = require("./create-attribute.request");
class UpdateAttribute extends (0, swagger_1.PartialType)(create_attribute_request_1.CreateAttribute) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAttribute = UpdateAttribute;
//# sourceMappingURL=update-attribute.request.js.map