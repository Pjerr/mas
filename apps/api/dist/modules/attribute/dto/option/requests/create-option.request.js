"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOption = void 0;
const openapi = require("@nestjs/swagger");
class CreateOption {
    static _OPENAPI_METADATA_FACTORY() {
        return { value: { required: true, type: () => String }, displayName: { required: true, type: () => String }, attributeId: { required: true, type: () => String }, price: { required: true, type: () => Number } };
    }
}
exports.CreateOption = CreateOption;
//# sourceMappingURL=create-option.request.js.map