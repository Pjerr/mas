"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryAttribtue = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../core/types");
class QueryAttribtue extends types_1.QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { include: { required: false, type: () => [String] } };
    }
}
exports.QueryAttribtue = QueryAttribtue;
//# sourceMappingURL=filter-attribute.request.js.map