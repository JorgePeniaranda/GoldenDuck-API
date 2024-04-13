import { type UserPrimitive } from '@/core/user/domain/user.primitive'

export interface PayloadPrimitive {
  readonly id: UserPrimitive['id']
  readonly role: UserPrimitive['role']
}
