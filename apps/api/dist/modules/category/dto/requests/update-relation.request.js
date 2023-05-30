"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelation = void 0;
const openapi = require("@nestjs/swagger");
class UpdateRelation {
    static _OPENAPI_METADATA_FACTORY() {
        return { parentId: { required: false, type: () => String }, childrenIds: { required: false, type: () => [String] } };
    }
}
exports.UpdateRelation = UpdateRelation;
//# sourceMappingURL=update-relation.request.js.map