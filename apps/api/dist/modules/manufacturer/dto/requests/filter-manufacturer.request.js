"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryManufacturer = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../core/types");
class QueryManufacturer extends types_1.QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { include: { required: false, type: () => [String] } };
    }
}
exports.QueryManufacturer = QueryManufacturer;
//# sourceMappingURL=filter-manufacturer.request.js.map