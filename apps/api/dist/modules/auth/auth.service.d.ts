import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthModuleConfig } from '@/modules/auth/auth.config';
import { Role } from 'shared';
export declare class AuthService {
    private config;
    constructor(config: AuthModuleConfig);
    createRoles(): Promise<void>;
    addRoleToUser(userId: string, role: Role): Promise<void>;
    removeRoleFromUserAndTheirSession(session: SessionContainer, role: Role): Promise<void>;
    getRolesForUser(userId: string): Promise<string[]>;
    getUsersThatHaveRole(role: string): Promise<string[]>;
}
//# sourceMappingURL=auth.service.d.ts.map