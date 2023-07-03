"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConfig = void 0;
const openapi = require("@nestjs/swagger");
class CreateConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { price: { required: false, type: () => Number }, option: { required: true, type: () => require("../../../../../core/entities/attribute-option.entity").AttributeOption } };
    }
}
exports.CreateConfig = CreateConfig;
//# sourceMappingURL=create-config.request.js.map