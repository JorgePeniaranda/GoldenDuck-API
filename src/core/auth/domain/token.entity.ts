import { Field, ObjectType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import { type TokenPrimitive } from './primitive/token.primitive'

@ObjectType()
export class Token implements TokenPrimitive {
  readonly #token: TokenPrimitive['token']

  constructor (token: TokenPrimitive['token']) {
    this.#token = token
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => String)
  @Expose()
  public get token (): TokenPrimitive['token'] {
    return this.#token
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public toJSON (): TokenPrimitive {
    return {
      token: this.token
    }
  }
}
