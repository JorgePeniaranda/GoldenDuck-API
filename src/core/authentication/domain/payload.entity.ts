import { type UserPrimitive } from '@/core/user/domain/user.primitive'

export class JwtPayload {
  public readonly id: UserPrimitive['id']
  public readonly role: UserPrimitive['role']

  constructor ({ id, role }: { id: UserPrimitive['id'], role: UserPrimitive['role'] }) {
    this.id = id
    this.role = role
  }
}
