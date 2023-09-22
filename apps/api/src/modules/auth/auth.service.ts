import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session, { SessionContainer } from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import {
  AuthModuleConfig,
  ConfigInjectionToken,
} from '@/modules/auth/auth.config';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import UserRoles, { UserRoleClaim } from 'supertokens-node/recipe/userroles';
import { Role } from 'shared';

@Injectable()
export class AuthService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: this.config.appInfo,
      supertokens: {
        connectionURI: this.config.connectionURI,
        apiKey: this.config.apiKey,
      },
      recipeList: [
        EmailPassword.init({
          override: {
            functions: (originalImplementation) => ({
              ...originalImplementation,
              signUp: async (input) => {
                const response = await originalImplementation.signUp(input);
                if (response.status === 'OK') {
                  const userRole = Role.EDITOR;
                  await this.addRoleToUser(response.user.id, userRole);
                }
                return response;
              },
            }),
          },
        }),
        Session.init({
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                createNewSession: async function (input) {
                  return originalImplementation.createNewSession({
                    ...input,
                    accessTokenPayload: {
                      ...input.accessTokenPayload,
                      ...(await UserRoleClaim.build(
                        input.userId,
                        input.tenantId,
                        input.userContext,
                      )),
                    },
                  });
                },
              };
            },
          },
        }),
        Dashboard.init(),
        UserRoles.init(),
      ],
    });

    this.createRoles();
  }

  async createRoles() {
    try {
      await UserRoles.createNewRoleOrAddPermissions(Role.ADMIN, [
        'read:all',
        'create:all',
        'update:all',
        'delete:all',
      ]);
      await UserRoles.createNewRoleOrAddPermissions(Role.EDITOR, [
        'read:all',
        'create:all',
        'update:all',
        'delete:all',
      ]);
      await UserRoles.createNewRoleOrAddPermissions(Role.VIEWER, ['read:all']);
    } catch (error) {
      console.error('Role creation error:', error);
    }
  }

  async addRoleToUser(userId: string, role: Role) {
    const response = await UserRoles.addRoleToUser('public', userId, role);

    if (response.status === 'UNKNOWN_ROLE_ERROR')
      throw new Error('No such role exists');

    if (response.didUserAlreadyHaveRole) {
      console.log('User already has a defined role');
      return;
    }
  }

  async removeRoleFromUserAndTheirSession(
    session: SessionContainer,
    role: Role,
  ) {
    const response = await UserRoles.removeUserRole(
      session.getTenantId(),
      session.getUserId(),
      role,
    );

    if (response.status === 'UNKNOWN_ROLE_ERROR') {
      throw new Error('No such role exists');
    }
    if (response.didUserHaveRole) return;
    await session.fetchAndSetClaim(UserRoles.UserRoleClaim);
    await session.fetchAndSetClaim(UserRoles.PermissionClaim);
  }

  async getRolesForUser(userId: string) {
    const response = await UserRoles.getRolesForUser('public', userId);
    return response.roles;
  }

  async getUsersThatHaveRole(role: string) {
    const response = await UserRoles.getUsersThatHaveRole('public', role);

    if (response.status === 'UNKNOWN_ROLE_ERROR')
      throw new Error('No such role exists');

    return response.users;
  }
}
