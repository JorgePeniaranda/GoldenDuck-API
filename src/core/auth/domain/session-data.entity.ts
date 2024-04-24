import { User } from '@/core/user/domain/user.entity'
import { type UserPrimitive } from '@/core/user/domain/user.primitive'
import { Field, ObjectType } from '@nestjs/graphql'
import CryptoJS from 'crypto-js'
import { type SessionDataPrimitive } from './primitive/session-data.primitive'
import { Exclude } from 'class-transformer'

@ObjectType()
export class SessionData implements SessionDataPrimitive {
  readonly #token: SessionDataPrimitive['token']
  readonly #user: UserPrimitive

  constructor (data: SessionDataPrimitive) {
    this.#token = CryptoJS.SHA256(data.token).toString(CryptoJS.enc.Hex)
    this.#user = data.user
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => String)
  @Exclude({ toPlainOnly: true })
  public get token (): SessionDataPrimitive['token'] {
    return this.#token
  }

  @Field(() => User)
  @Exclude({ toPlainOnly: true })
  public get user (): UserPrimitive {
    return this.#user
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public toJSON (): SessionDataPrimitive {
    return {
      token: this.token,
      user: this.user
    }
  }
}
