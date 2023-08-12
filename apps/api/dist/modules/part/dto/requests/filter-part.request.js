"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryPart = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../core/types");
const POPULATE = ['attributes.group', 'variants.optionsConfigs'];
class QueryPart extends types_1.QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { include: { required: false, type: () => [String] } };
    }
}
exports.QueryPart = QueryPart;
//# sourceMappingURL=filter-part.request.js.map