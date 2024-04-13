import { ROLES_KEY } from '@/constants'
import { type JwtPayload } from '@/core/authentication/domain/payload.entity'
import { type UserPrimitive } from '@/core/user/domain/user.primitive'
import { Injectable, type CanActivate, type ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private readonly reflector: Reflector) {}

  canActivate (context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Array<UserPrimitive['role']>>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    const { user }: { user: JwtPayload } = context.switchToHttp().getRequest()
    return requiredRoles.some((role) => user.role.includes(role))
  }
}
