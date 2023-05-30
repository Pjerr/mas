"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProperyKey = void 0;
const slugify_1 = __importDefault(require("slugify"));
const generateProperyKey = (displayName) => {
    return (0, slugify_1.default)(displayName, {
        lower: true,
        trim: true,
        strict: true,
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
    });
};
exports.generateProperyKey = generateProperyKey;
//# sourceMappingURL=property-key.js.map