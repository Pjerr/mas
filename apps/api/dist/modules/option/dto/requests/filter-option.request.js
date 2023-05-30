"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryOption = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../core/types");
class QueryOption extends types_1.QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { include: { required: false, type: () => [String] } };
    }
}
exports.QueryOption = QueryOption;
//# sourceMappingURL=filter-option.request.js.map