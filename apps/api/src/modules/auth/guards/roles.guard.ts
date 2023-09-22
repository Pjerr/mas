import { ROLES_KEY } from '@/modules/auth/roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'shared';
import UserRoles from 'supertokens-node/recipe/userroles';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    // const request = context.switchToHttp().getRequest();
    // const roles = request.session.getClaimValue(UserRoles.UserRoleClaim);
    // console.log(roles);
    // return requiredRoles.some((role) => user.roles?.includes(role));
    return true;
  }
}
