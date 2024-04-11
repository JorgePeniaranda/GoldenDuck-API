import { type UserPrimitive } from '@/core/user/domain/user.primitive'

export class JwtPayload {
  public id: UserPrimitive['id']
  public role: UserPrimitive['role']

  constructor ({ id, role }: { id: UserPrimitive['id'], role: UserPrimitive['role'] }) {
    this.id = id
    this.role = role
  }
}
