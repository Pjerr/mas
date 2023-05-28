"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filterable = void 0;
const constants_1 = require("../../../utils/constants");
function Filterable() {
    return function (target, propertyKey) {
        var _a;
        const filterProperties = (_a = Reflect.getMetadata(`${constants_1.FILTER_PROPERTIES}`, target.constructor)) !== null && _a !== void 0 ? _a : [];
        Reflect.defineMetadata(`${constants_1.FILTER_PROPERTIES}`, [...filterProperties, propertyKey], target.constructor);
    };
}
exports.Filterable = Filterable;
//# sourceMappingURL=filter.decorator.js.map