"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sort = exports.SortOrder = void 0;
const openapi = require("@nestjs/swagger");
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
class Sort {
    static _OPENAPI_METADATA_FACTORY() {
        return { field: { required: false, type: () => String }, order: { required: false, enum: require("./sort.request").SortOrder } };
    }
}
exports.Sort = Sort;
//# sourceMappingURL=sort.request.js.map