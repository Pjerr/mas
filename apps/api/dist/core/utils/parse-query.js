"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterEntity = void 0;
const extractors_1 = require("../meta/extractors");
const types_1 = require("../types");
const filterEntity = (query, target) => {
    const filterEntity = new types_1.FilterEntity();
    setOptions(query, filterEntity);
    setQuery(query, filterEntity, target);
    return filterEntity;
};
exports.filterEntity = filterEntity;
const setQuery = (query, filterEntity, target) => {
    if (!query.filters)
        return;
    const filterable = (0, extractors_1.extractFilterableMetadata)(target);
    query.filters.map((filter) => {
        if (filterable.includes(filter.field)) {
            filterEntity.query[filter.field] = {
                [filter.operator]: filter.value,
            };
        }
    });
};
const setOptions = (query, filterEntity) => {
    if (query.include)
        filterEntity.options['populate'] = query.include;
    if (query.sort) {
        filterEntity.options['orderBy'] = {};
        filterEntity.options['orderBy'][query.sort.field] = query.sort.order;
    }
};
//# sourceMappingURL=parse-query.js.map