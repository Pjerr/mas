"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVariant = void 0;
const openapi = require("@nestjs/swagger");
class CreateVariant {
    static _OPENAPI_METADATA_FACTORY() {
        return { partId: { required: true, type: () => String }, configVariants: { required: true, type: () => [[require("../../../../core/entities/option-config.entity").OptionConfig]] } };
    }
}
exports.CreateVariant = CreateVariant;
//# sourceMappingURL=create-variant.request.js.map