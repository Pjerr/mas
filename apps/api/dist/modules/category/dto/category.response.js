"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesResponse = exports.CategoryResponse = void 0;
const openapi = require("@nestjs/swagger");
class CategoryResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => require("../../../core/entities/category.entity").Category } };
    }
}
exports.CategoryResponse = CategoryResponse;
class CategoriesResponse {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("../../../core/entities/category.entity").Category] } };
    }
}
exports.CategoriesResponse = CategoriesResponse;
//# sourceMappingURL=category.response.js.map