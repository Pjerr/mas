"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttributeDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_attribute_dto_1 = require("./create-attribute.dto");
class UpdateAttributeDto extends (0, mapped_types_1.PartialType)(create_attribute_dto_1.CreateAttributeDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAttributeDto = UpdateAttributeDto;
//# sourceMappingURL=update-attribute.dto.js.map