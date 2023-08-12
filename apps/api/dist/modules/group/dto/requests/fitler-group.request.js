"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryGroup = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../core/types");
const POPULATE = [
    'attributes',
    'attributes.group',
    'attributes.options.configs',
];
class QueryGroup extends types_1.QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { include: { required: false, type: () => [String] } };
    }
}
exports.QueryGroup = QueryGroup;
//# sourceMappingURL=fitler-group.request.js.map