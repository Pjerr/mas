"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOptionConfig = void 0;
const openapi = require("@nestjs/swagger");
class FilterOptionConfig {
    static _OPENAPI_METADATA_FACTORY() {
        return { attributeId: { required: true, type: () => String }, partId: { required: true, type: () => String } };
    }
}
exports.FilterOptionConfig = FilterOptionConfig;
//# sourceMappingURL=filter-option-config.request.js.map