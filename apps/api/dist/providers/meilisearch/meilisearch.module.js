"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MeiliSearchModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeiliSearchModule = void 0;
const constants_1 = require("../../core/utils/constants");
const meilisearch_1 = require("./");
const common_1 = require("@nestjs/common");
let MeiliSearchModule = MeiliSearchModule_1 = class MeiliSearchModule {
    static forRootAsync(options) {
        const connectionProvider = {
            provide: constants_1.MEILI_CLIENT,
            useFactory: (meiliOptions) => (0, meilisearch_1.createConnectionFactory)(meiliOptions),
            inject: [constants_1.MEILI_MODULE_OPTIONS],
        };
        const asyncProviders = (0, meilisearch_1.createAsyncProviders)(options);
        return {
            module: MeiliSearchModule_1,
            imports: options.imports || [],
            providers: [...asyncProviders, connectionProvider],
            exports: [connectionProvider],
        };
    }
};
MeiliSearchModule = MeiliSearchModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], MeiliSearchModule);
exports.MeiliSearchModule = MeiliSearchModule;
//# sourceMappingURL=meilisearch.module.js.map