"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryCategory = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../core/types");
class QueryCategory extends types_1.QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { include: { required: false, type: () => [String] } };
    }
}
exports.QueryCategory = QueryCategory;
//# sourceMappingURL=filter-category.request.js.map