import { type UserPrimitive } from '@/core/user/domain/user.primitive'

export interface SessionDataPrimitive {
  token: string
  user: UserPrimitive
}
