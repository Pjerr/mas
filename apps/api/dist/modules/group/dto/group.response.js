"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSearch = exports.GroupsResponse = exports.GroupResponse = void 0;
const openapi = require("@nestjs/swagger");
class GroupResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../core/entities/group.entity").Group } };
    }
}
exports.GroupResponse = GroupResponse;
class GroupsResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../core/entities/group.entity").Group] } };
    }
}
exports.GroupsResponse = GroupsResponse;
class GroupSearch {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../core/entities/group-document.entity").GroupDocument] } };
    }
}
exports.GroupSearch = GroupSearch;
//# sourceMappingURL=group.response.js.map