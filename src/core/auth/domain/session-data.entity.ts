import { type UserPrimitive } from '@/core/user/domain/user.primitive'
import bcrypt from 'bcryptjs'
import { type SessionDataPrimitive } from './primitive/session-data.primitive'

export class SessionData implements SessionDataPrimitive {
  readonly #token: SessionDataPrimitive['token']
  readonly #user: UserPrimitive

  constructor (data: SessionDataPrimitive) {
    this.#token = bcrypt.hashSync(data.token, 8)
    this.#user = data.user
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  public get token (): SessionDataPrimitive['token'] {
    return this.#token
  }

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
