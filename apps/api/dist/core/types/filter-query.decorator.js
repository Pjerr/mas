"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterQuery = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function FilterQuery(fieldName, query) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(query), (0, swagger_1.ApiQuery)({
        required: false,
        name: fieldName,
        style: 'deepObject',
        explode: true,
        type: 'object',
        schema: {
            $ref: (0, swagger_1.getSchemaPath)(query),
        },
    }));
}
exports.FilterQuery = FilterQuery;
//# sourceMappingURL=filter-query.decorator.js.map