import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type PayloadPrimitive } from './primitive/payload.primitive'
import { Expose } from 'class-transformer'

@ObjectType()
export class JwtPayload implements PayloadPrimitive {
  readonly #id: PayloadPrimitive['id']
  readonly #role: PayloadPrimitive['role']

  constructor ({ id, role }: { id: PayloadPrimitive['id'], role: PayloadPrimitive['role'] }) {
    this.#id = id
    this.#role = role
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): PayloadPrimitive['id'] {
    return this.#id
  }

  @Field(() => String)
  @Expose()
  public get role (): PayloadPrimitive['role'] {
    return this.#role
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public toJSON (): PayloadPrimitive {
    return {
      id: this.id,
      role: this.role
    }
  }
}
