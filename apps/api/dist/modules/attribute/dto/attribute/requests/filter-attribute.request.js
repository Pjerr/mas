"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryAttribute = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../../core/types");
class QueryAttribute extends types_1.QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { include: { required: false, type: () => [String] } };
    }
}
exports.QueryAttribute = QueryAttribute;
//# sourceMappingURL=filter-attribute.request.js.map