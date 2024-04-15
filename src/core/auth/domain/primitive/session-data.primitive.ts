import { type UserPrimitive } from '@/core/user/domain/user.primitive'

export interface SessionDataPrimitive {
  readonly token: string
  readonly user: UserPrimitive
}
