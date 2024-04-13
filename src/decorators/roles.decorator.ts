import { ROLES_KEY } from '@/constants'
import { type UserPrimitive } from '@/core/user/domain/user.primitive'
import { type CustomDecorator, SetMetadata } from '@nestjs/common'

export const Roles = (...roles: Array<UserPrimitive['role']>): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles)
