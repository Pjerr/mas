"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryVariant = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../core/types");
const POPULATE = [];
class QueryVariant extends types_1.QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { include: { required: false, type: () => [Object] } };
    }
}
exports.QueryVariant = QueryVariant;
//# sourceMappingURL=filter-variants.request.js.map