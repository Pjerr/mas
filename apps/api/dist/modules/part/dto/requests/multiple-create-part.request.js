"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipeCreatePart = void 0;
const openapi = require("@nestjs/swagger");
class MultipeCreatePart {
    static _OPENAPI_METADATA_FACTORY() {
        return { payloads: { required: true, type: () => [require("./create-part.request").CreatePart] } };
    }
}
exports.MultipeCreatePart = MultipeCreatePart;
//# sourceMappingURL=multiple-create-part.request.js.map