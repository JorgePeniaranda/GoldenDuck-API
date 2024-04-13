import { type UserPrimitive } from '@/core/user/domain/user.primitive'

export class JwtPayload {
  readonly #id: UserPrimitive['id']
  readonly #role: UserPrimitive['role']

  constructor ({ id, role }: { id: UserPrimitive['id'], role: UserPrimitive['role'] }) {
    this.#id = id
    this.#role = role
  }

  get id (): UserPrimitive['id'] {
    return this.#id
  }

  get role (): UserPrimitive['role'] {
    return this.#role
  }

  toJSON (): { id: UserPrimitive['id'], role: UserPrimitive['role'] } {
    return {
      id: this.id,
      role: this.role
    }
  }
}
