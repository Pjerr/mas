"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleUpdatePart = void 0;
const openapi = require("@nestjs/swagger");
class MultipleUpdatePart {
    static _OPENAPI_METADATA_FACTORY() {
        return { payloads: { required: true, type: () => [require("./update-part.request").UpdatePart] } };
    }
}
exports.MultipleUpdatePart = MultipleUpdatePart;
//# sourceMappingURL=multiple-update-part.request.js.map