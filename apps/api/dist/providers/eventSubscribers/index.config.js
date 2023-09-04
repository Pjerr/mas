"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGroupDocument = exports.updateGroupSettings = exports.index_key_group = void 0;
exports.index_key_group = 'groups';
exports.updateGroupSettings = {
    displayedAttributes: [
        'name',
        'id',
        'attributes.displayName',
        'attributes.id',
    ],
    searchableAttributes: ['name', 'attributes.displayName'],
    typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
            oneTypo: 4,
            twoTypos: 5,
        },
    },
    pagination: {
        maxTotalHits: 5,
    },
};
const generateGroupDocument = (group) => {
    return {
        id: group.id,
        name: group.name,
        attributes: group.attributes.getItems().map((attribute) => {
            return {
                displayName: attribute.displayName,
                id: attribute.id,
            };
        }),
    };
};
exports.generateGroupDocument = generateGroupDocument;
//# sourceMappingURL=index.config.js.map