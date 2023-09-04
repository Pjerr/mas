"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAsyncProviders = exports.createAsyncOptionsProvider = exports.createConnectionFactory = void 0;
const constants_1 = require("../../core/utils/constants");
const meilisearch_1 = __importDefault(require("meilisearch"));
function createConnectionFactory(options) {
    return new meilisearch_1.default(options);
}
exports.createConnectionFactory = createConnectionFactory;
function createAsyncOptionsProvider(options) {
    if (options.useFactory) {
        return {
            provide: constants_1.MEILI_MODULE_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };
    }
    return {
        provide: constants_1.MEILI_MODULE_OPTIONS,
        useFactory: async (optionsFactory) => await optionsFactory.createMeiliOptions(),
        inject: [
            (options.useClass ||
                options.useExisting),
        ],
    };
}
exports.createAsyncOptionsProvider = createAsyncOptionsProvider;
function createAsyncProviders(options) {
    if (options.useExisting || options.useFactory) {
        return [createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass;
    return [
        createAsyncOptionsProvider(options),
        {
            provide: useClass,
            useClass,
        },
    ];
}
exports.createAsyncProviders = createAsyncProviders;
//# sourceMappingURL=create-meilisearch.providers.js.map