import { type PayloadPrimitive } from './primitive/payload.primitive'

export class JwtPayload implements PayloadPrimitive {
  readonly #id: PayloadPrimitive['id']
  readonly #role: PayloadPrimitive['role']

  constructor ({ id, role }: { id: PayloadPrimitive['id'], role: PayloadPrimitive['role'] }) {
    this.#id = id
    this.#role = role
  }

  get id (): PayloadPrimitive['id'] {
    return this.#id
  }

  get role (): PayloadPrimitive['role'] {
    return this.#role
  }

  toJSON (): PayloadPrimitive {
    return {
      id: this.id,
      role: this.role
    }
  }
}
