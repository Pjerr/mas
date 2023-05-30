"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsResponse = exports.GroupResponse = void 0;
const openapi = require("@nestjs/swagger");
class GroupResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../core/entities/group.entity").Group }, links: { required: false, type: () => [String] } };
    }
}
exports.GroupResponse = GroupResponse;
class GroupsResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../core/entities/group.entity").Group] }, links: { required: false, type: () => [String] } };
    }
}
exports.GroupsResponse = GroupsResponse;
//# sourceMappingURL=group.response.js.map