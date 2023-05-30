"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let QueryPipe = class QueryPipe {
    constructor() {
        this.intoArray = (property) => {
            const include = [];
            if (property)
                if ((0, class_validator_1.isArray)(property) && property.length > 0)
                    property.map((value) => include.push(value));
                else
                    include.push(property);
            return include;
        };
    }
    transform(query) {
        if (query)
            query.include = this.intoArray(query.include);
        if (query)
            query.filters = this.intoArray(query.filters);
        return query;
    }
};
QueryPipe = __decorate([
    (0, common_1.Injectable)()
], QueryPipe);
exports.QueryPipe = QueryPipe;
//# sourceMappingURL=query.pipe.js.map