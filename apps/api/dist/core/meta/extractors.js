"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFilterableMetadata = void 0;
const constants_1 = require("../utils/constants");
require("reflect-metadata");
const extractFilterableMetadata = (target) => {
    return Reflect.getMetadata(`${constants_1.FILTER_PROPERTIES}`, target);
};
exports.extractFilterableMetadata = extractFilterableMetadata;
//# sourceMappingURL=extractors.js.map