"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const supertokens_node_1 = __importDefault(require("supertokens-node"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const dashboard_1 = __importDefault(require("supertokens-node/recipe/dashboard"));
const auth_config_1 = require("./auth.config");
const emailpassword_1 = __importDefault(require("supertokens-node/recipe/emailpassword"));
const userroles_1 = __importStar(require("supertokens-node/recipe/userroles"));
const shared_1 = require("shared");
let AuthService = class AuthService {
    constructor(config) {
        this.config = config;
        supertokens_node_1.default.init({
            appInfo: this.config.appInfo,
            supertokens: {
                connectionURI: this.config.connectionURI,
                apiKey: this.config.apiKey,
            },
            recipeList: [
                emailpassword_1.default.init({
                    override: {
                        functions: (originalImplementation) => (Object.assign(Object.assign({}, originalImplementation), { signUp: async (input) => {
                                const response = await originalImplementation.signUp(input);
                                if (response.status === 'OK') {
                                    const userRole = shared_1.Role.EDITOR;
                                    await this.addRoleToUser(response.user.id, userRole);
                                }
                                return response;
                            } })),
                    },
                }),
                session_1.default.init({
                    override: {
                        functions: (originalImplementation) => {
                            return Object.assign(Object.assign({}, originalImplementation), { createNewSession: async function (input) {
                                    return originalImplementation.createNewSession(Object.assign(Object.assign({}, input), { accessTokenPayload: Object.assign(Object.assign({}, input.accessTokenPayload), (await userroles_1.UserRoleClaim.build(input.userId, input.tenantId, input.userContext))) }));
                                } });
                        },
                    },
                }),
                dashboard_1.default.init(),
                userroles_1.default.init(),
            ],
        });
        this.createRoles();
    }
    async createRoles() {
        try {
            await userroles_1.default.createNewRoleOrAddPermissions(shared_1.Role.ADMIN, [
                'read:all',
                'create:all',
                'update:all',
                'delete:all',
            ]);
            await userroles_1.default.createNewRoleOrAddPermissions(shared_1.Role.EDITOR, [
                'read:all',
                'create:all',
                'update:all',
                'delete:all',
            ]);
            await userroles_1.default.createNewRoleOrAddPermissions(shared_1.Role.VIEWER, ['read:all']);
        }
        catch (error) {
            console.error('Role creation error:', error);
        }
    }
    async addRoleToUser(userId, role) {
        const response = await userroles_1.default.addRoleToUser('public', userId, role);
        if (response.status === 'UNKNOWN_ROLE_ERROR')
            throw new Error('No such role exists');
        if (response.didUserAlreadyHaveRole) {
            console.log('User already has a defined role');
            return;
        }
    }
    async removeRoleFromUserAndTheirSession(session, role) {
        const response = await userroles_1.default.removeUserRole(session.getTenantId(), session.getUserId(), role);
        if (response.status === 'UNKNOWN_ROLE_ERROR') {
            throw new Error('No such role exists');
        }
        if (response.didUserHaveRole)
            return;
        await session.fetchAndSetClaim(userroles_1.default.UserRoleClaim);
        await session.fetchAndSetClaim(userroles_1.default.PermissionClaim);
    }
    async getRolesForUser(userId) {
        const response = await userroles_1.default.getRolesForUser('public', userId);
        return response.roles;
    }
    async getUsersThatHaveRole(role) {
        const response = await userroles_1.default.getUsersThatHaveRole('public', role);
        if (response.status === 'UNKNOWN_ROLE_ERROR')
            throw new Error('No such role exists');
        return response.users;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_config_1.ConfigInjectionToken)),
    __metadata("design:paramtypes", [Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map