import { type User } from '@prisma/client'

export class JwtPayload {
  public id: User['id']
  public role: User['role']

  constructor ({ id, role }: { id: User['id'], role: User['role'] }) {
    this.id = id
    this.role = role
  }
}
