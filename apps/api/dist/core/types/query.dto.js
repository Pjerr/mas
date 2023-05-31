"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFilters = exports.QueryEntity = exports.Filter = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const shared_1 = require("shared");
class Filter {
    static _OPENAPI_METADATA_FACTORY() {
        return { field: { required: true, type: () => String }, value: { required: true, type: () => Object }, operator: { required: true, enum: require("../../../../../packages/shared/dist/types/enums").ConditionalOperator } };
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(shared_1.ConditionalOperator),
    __metadata("design:type", String)
], Filter.prototype, "operator", void 0);
exports.Filter = Filter;
class QueryEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { filters: { required: false, type: () => [require("./query.dto").Filter] }, include: { required: false }, sort: { required: false, type: () => require("./sort.request").Sort } };
    }
}
exports.QueryEntity = QueryEntity;
class EntityFilters {
    static _OPENAPI_METADATA_FACTORY() {
        return { ids: { required: false, type: () => [String] } };
    }
}
exports.EntityFilters = EntityFilters;
//# sourceMappingURL=query.dto.js.map