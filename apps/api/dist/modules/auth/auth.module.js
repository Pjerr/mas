"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const auth_config_1 = require("./auth.config");
const auth_middleware_1 = require("./auth.middleware");
const auth_service_1 = require("./auth.service");
const guards_1 = require("./guards");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AuthModule = AuthModule_1 = class AuthModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('');
    }
    static forRoot({ connectionURI, apiKey, appInfo, }) {
        return {
            providers: [
                {
                    useValue: {
                        appInfo,
                        connectionURI,
                        apiKey,
                    },
                    provide: auth_config_1.ConfigInjectionToken,
                },
                {
                    provide: core_1.APP_GUARD,
                    useClass: guards_1.RolesGuard,
                },
                auth_service_1.AuthService,
            ],
            exports: [],
            imports: [],
            module: AuthModule_1,
        };
    }
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [],
        exports: [],
        controllers: [],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map