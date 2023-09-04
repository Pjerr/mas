"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMeiliSearch = void 0;
const constants_1 = require("../../core/utils/constants");
const common_1 = require("@nestjs/common");
function InjectMeiliSearch() {
    return (0, common_1.Inject)(constants_1.MEILI_CLIENT);
}
exports.InjectMeiliSearch = InjectMeiliSearch;
//# sourceMappingURL=inject-meilisearch.decorator.js.map